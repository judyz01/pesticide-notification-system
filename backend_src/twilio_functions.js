const dotenv = require('dotenv').config();
const i18next = require('i18next');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mSID = process.env.MESSAGING_SERVICE_ID;
const mSIDSp = process.env.MESSAGING_SERVICE_ID_SPANISH;
const client = require('twilio')(accountSid, authToken);

const county_functions = require('./county_functions')

const messages = {
    '0': `Available counties: ${county_functions.available_county_table}. Text HALT <COUNTY> to stop receiving messages about a certain county. Text STOP to stop receiving all messages.`,
    '1': "Thank you for allowing the CDPR NOI Notification System to send you information regarding pesticide use. Text GUIDE for more information."
}

const errorCodes = {
    '23505': "repeat_subscription",
    '42P01': "invalid_county",
}

const optOutKeywords = new Set([
    "CANCEL",
    "END",
    "QUIT",
    "STOP",
    "STOPALL",
    "UNSUBSCRIBE",
    "START",
    "UNSTOP",
    "YES",
    "HELP",
    "INFO",
    "ALTO",
    "COMENZAR",
    "AYUDA"
]);

// Reply to subscription
const sendSubscribeConfirmation = (req, res, county) => {
    client.messages
        .create({
            body: req.t("successful_subscription", {county: county}),
            messagingServiceSid: req.headers['accept-language'] == 'en' ? mSID: mSIDSp,
            to: req.body.From
        })
        .then(message => console.log(message.status));
}

// Reply to unsubscription
const sendUnsubscribeConfirmation = (req, res, county) => {
    client.messages
        .create({
            body: req.t("successful_unsubscription", {county: county}),
            messagingServiceSid: req.headers['accept-language'] == 'en' ? mSID: mSIDSp,
            to: req.body.From
        })
        .then(message => console.log(message.status));
}

const sendGuide = (req, res) => {
    client.messages
        .create({
            body: req.t("guide", {available_counties: `${county_functions.available_county_table}`}),
            messagingServiceSid: req.headers['accept-language'] == 'en' ? mSID: mSIDSp,
            to: req.body.From
        })
        .then(message => console.log(message.status));
}

/**
 * Function that sends an error text message
 * @param {*} req 
 * @param {*} res 
 * @param {*} err 
 */
const sendError = async (req, res, err) => {
    client.messages
        .create({
            body: req.t(err),
            messagingServiceSid: req.headers['accept-language'] == 'en' ? mSID: mSIDSp,
            to: req.body.From
        })
        .then(message => console.log(message.status));
}

const sendNotifications = async (translationFunction, number, Chemical_name, link, language, lat, lon) => {
    client.messages
        .create({
            body: translationFunction("notification", {chemical_name: Chemical_name, link: link, lat: lat, lon: lon}),
            messagingServiceSid: language == 'en' ? mSID : mSIDSp,
            to: number
        })
        .then(message => console.log(message.sid))
}

module.exports = {
    sendNotifications,
    sendSubscribeConfirmation,
    sendUnsubscribeConfirmation,
    sendError,
    sendGuide,
    optOutKeywords
}