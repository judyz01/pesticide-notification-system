const dotenv = require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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
module.exports = sendNotifications;