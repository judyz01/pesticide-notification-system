const { expect } = require('chai');
const county_functions = require('../county_functions.js');

describe("County functions", () => {
    describe("Valid county", () => {
        it("returns the corresponding county number", (done) => {
            const stanislaus = county_functions.county_lookup("STANISLAUS");
            expect(stanislaus).to.equal(50);
            done();
        });
    });
    describe("Invalid county", (done) => {
        it("returns 0", (done) => {
            const randomCounty = county_functions.county_lookup("ORLANDO");
            expect(randomCounty).to.equal(0);
            done();
        });
    })
})