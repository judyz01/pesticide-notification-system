const dotenv = require('dotenv').config();

const request = require('request');
const app = require('../index.js').app;
const pool = require('../index.js').pool;
const sinon = require('sinon');
const assert = require('assert');
const twilio_functions = require("../twilio_functions.js");
const expect = require('chai').expect;

describe("Twilio Functions", () => {
    const testCounty = "STANISLAUS"
    const testResponse = {}
    const testReq = {
        headers: [
            { 'accept-language': 'en' }
        ],
        body: {
            From: process.env.PHONE_NUMBER
        }
    }
    const testRes = {}

    // describe("Subscribe Confirmation", () => {
    //     describe("Valid", () => {
    //         before(() => {
    //         })
    //         it("sends a subscription confirmation text", async () => {
    //             const confirmation = await twilio_functions.sendSubscribeConfirmation(testReq, testMsg);

    //         });
    //     })
    // });
});