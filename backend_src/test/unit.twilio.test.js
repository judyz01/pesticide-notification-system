const request = require('request');
const app = require('../index.js').app;
const pool = require('../index.js').pool;
const sinon = require('sinon');
const assert = require('assert');
const twilio_functions = require("../twilio_functions.js");
const { expect } = require('chai');

describe("Twilio Functions", () => {
    const testCounty = "STANISLAUS"
    const testResponse = {}
    const testParams = {
        req: {
            headers: [
                { 'accept-language': 'en' }
            ]
        },
        res: {},
        county: "STANISLAUS",
    }
    let subFunction;

    describe("Subscribe Confirmation", () => {
        describe("Valid", () => {
            before(() => {
                subFunction = sinon.stub(twilio_functions, "sendSubscribeConfirmation");
                subFunction.withArgs(testParams)
                    .resolves(
                        {
                            message: "Confirmation sent"
                        }
                    ).resolves(
                        2
                    )
            })
            it("sends a subscription confirmation text", async () => {
                const confirmation = await subFunction(testParams);
                assert.equal(confirmation, 2);
            });
        })
    });
});