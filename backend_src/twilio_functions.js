const dotenv = require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mSID = process.env.MESSAGING_SERVICE_ID;
const client = require('twilio')(accountSid, authToken);

const messages = {
    '0': "Available counties: STANISLAUS. Text HALT <COUNTY> to stop receiving notifications about a certain county. Text STOP to stop receiving all messages.",
    '1': "Thank you for allowing the CDPR NOI Notification System to send you information regarding pesticide use. Text GUIDE for more information."
}

const errorMessages = {
    '0': "Try again. Text SUBSCRIBE <COUNTY> to receive information about pesticide use in your area. For a full list of available counties, text GUIDE.",
    '1': "Too many commands. Text SUBSCRIBE <COUNTY> to receive information about pesticide use in your area. For a full list of available counties, text GUIDE.",
    '23505': "You've already subscribed to this county. For a full list of available counties, text GUIDE.",
    '42P01': "Notifications for this county are unavailable right now. For a full list of available counties, text GUIDE.",
}

// Reply to subscription
const sendSubscribeConfirmation = (req, res, county) => {
    client.messages
        .create({
            body: `Thank you for subscribing to the CDPR NOI Notification System for ${county}.`,
            messagingServiceSid: mSID,
            to: req.body.From
        })
        .then(message => console.log(message.status));
}

const sendMessage = (req, res, messageNumber) => {
    client.messages
        .create({
            body: messages[messageNumber],
            messagingServiceSid: mSID,
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
    const message = errorMessages[err]
    client.messages
        .create({
            body: message,
            messagingServiceSid: mSID,
            to: req.body.From
        })
        .then(message => console.log(message.status));
}

const sendNotifications = async (number) => {
    client.messages
        .create({
            body: '[Chemical Name] was sprayed in your county. Click here [link] to find out more.',
            messagingServiceSid: mSID,
            to: number
        })
        .then(message => console.log(message.sid))
}
module.exports = {
    sendNotifications,
    sendSubscribeConfirmation,
    sendError,
    sendMessage
}