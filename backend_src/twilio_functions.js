const dotenv = require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Reply to subscription
const sendSubscribeConfirmation = (req, res, county) => {
    client.messages
        .create({
            body: `Thank you for subscribing to the CDPR NOI Notification System for ${county}.`,
            messagingServiceSid: 'MGb1fe5ad82f9a96c1c4ef689f71c6853e',
            to: req.body.From
        })
        .then(message => console.log(message.status));
}

const sendSubscribeError = async (req, res, err) => {
    let message = "Try again. Text SUBSCRIBE <COUNTY> to receive information about pesticide use in your area. For a full list of available counties, text HELP.";
    if (err.code == '23505') {
        message = "You've already subscribed to this county. For a full list of available counties, text HELP."
    }
    client.messages
        .create({
            body: message,
            messagingServiceSid: 'MGb1fe5ad82f9a96c1c4ef689f71c6853e',
            to: req.body.From
        })
        .then(message => console.log(message.status));
}

const sendNotifications = async (number) => {
    client.messages
        .create({
            body: '[Chemical Name] was sprayed in your county. Click here [link] to find out more.',
            messagingServiceSid: 'MGb1fe5ad82f9a96c1c4ef689f71c6853e',
            to: number
        })
        .then(message => console.log(message.sid))
    return
}
module.exports = {
    sendNotifications,
    sendSubscribeConfirmation,
    sendSubscribeError
}