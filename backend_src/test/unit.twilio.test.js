const request = require('request');
const app = require('../index.js').app;
const pool = require('../index.js').pool;
const sinon = require('sinon');
const twilio_functions = require("../twilio_functions.js");

const { expect } = require('chai'); describe("Backend API", () => {
    const testCounty = "STANISLAUS"
    const testResponse = {}
    const testRequest = {
        headers: [
            { 'accept-language': 'en' }
        ]
    }

    describe("Subscribe Confirmation", () => {
        it("sends a subscription confirmation text", async (done) => {
            const subFunction = sinon.stub(twilio_functions, "sendSubscribeConfirmation")
            subFunction.withArgs({
                req: {
                    headers: [
                        { 'accept-language': 'en' }
                    ]
                },
                res: {

                },
                county: "STANISLAUS",
            }).resolves(
                {
                    message: "Confirmation sent"
                }
            )
            // const confirmation = await subFunction({ req: testReq, res: testResponse, county: testCounty });
            // expect(confirmation.message, "Confirmation sent")
            done();
        });
    });
});