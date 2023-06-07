const dotenv = require('dotenv').config();
const i18next = require('i18next');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const testSid = process.env.TWILIO_TEST_ACCOUNT_SID;
const testToken = process.env.TWILIO_TEST_AUTH_TOKEN;
let mSID = process.env.MESSAGING_SERVICE_ID;
let mSIDSp = process.env.MESSAGING_SERVICE_ID_SPANISH;
let client;
let sender = "messagingServiceSid"
if (process.env.NODE_ENV === 'development') {
    client = require('twilio')(testSid, testToken);
    // Twilio provided testing "magic" numbers
    mSID = '+15005550006';
    mSIDSp = '+15005550006';
    sender = "from"
} else {
    client = require('twilio')(accountSid, authToken)
}

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
const sendSubscribeConfirmation = async (req, res, county) => {
    client.messages
        .create({
            body: req.t("successful_subscription", { county: county }),
            [sender]: req.headers['accept-language'] == 'en' ? mSID : mSIDSp,
            to: req.body.From
        })
        .then(message => console.log(message.status));
}

// Reply to unsubscription
const sendUnsubscribeConfirmation = async (req, res, county) => {
    client.messages
        .create({
            body: req.t("successful_unsubscription", { county: county }),
            [sender]: req.headers['accept-language'] == 'en' ? mSID : mSIDSp,
            to: req.body.From
        })
        .then(message => console.log(message.status));
}

const sendGuide = async (req) => {
    try {
        client.messages
            .create({
                body: req.t("guide", { available_counties: county_functions.available_county_table }),
                [sender]: req.headers['accept-language'] == 'en' ? mSID : mSIDSp,
                to: req.body.From
            })
            .then((message) => {
                console.log(message.status)
            });
    } catch (err) {
        console.log(error)
    }
}

/**
 * Function that sends an error text message
 * @param {*} req 
 * @param {*} res 
 * @param {*} err 
 */
const sendError = async (req, res, err) => {
    try {
        client.messages
            .create({
                body: req.t(err),
                [sender]: req.headers['accept-language'] == 'en' ? mSID : mSIDSp,
                to: req.body.From
            })
            .then(message => console.log(message.status));
    } catch (err) {
        console.log(err);
    }
}

const sendNotifications = async (i18next, number, Chemical_name, link, language, lat, lon) => {
    client.messages
        .create({
            body: i18next.t("notification", { chemical_name: Chemical_name, link: link, lat: lat, lon: lon, lng: language }),
            messagingServiceSid: language == 'en' ? mSID : mSIDSp,
            to: number
        })
        .then(message => console.log(message.status))
}

module.exports = {
    sendNotifications,
    sendSubscribeConfirmation,
    sendUnsubscribeConfirmation,
    sendError,
    sendGuide,
    optOutKeywords
}