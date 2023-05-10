const request = require('request');
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../index.js');
const sinon = require('sinon');

describe("Backend API", () => {
    describe("API Sanity Check", () => {
        let url = "http://localhost:8080/"

        it("returns status 200", (done) => {
            request(url, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            })
        });
        it("returns 'GET / works correctly'", (done) => {
            request(url, (error, response, body) => {
                expect(response.body).to.equal("GET / works correctly");
                done();
            })
        })
    })
    describe("findCountyNOI", () => {
        let url = "http://localhost:8080/findCountyNOI";

        it("returns NOIs in the given counties", (done) => {
            supertest(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', "text/html; charset=utf-8")
                .expect(200, done)
        });
    })
});