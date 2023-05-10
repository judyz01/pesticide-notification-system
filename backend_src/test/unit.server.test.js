const request = require('request');
const assert = require('assert');
const supertest = require('supertest');
const app = require('../index.js');
const sinon = require('sinon');

describe("Backend API", () => {
    describe("API endpoint sanity check", () => {
        it("returns 'GET / works correctly'", () => {
            return supertest(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', "text/html; charset=utf-8")
                .expect(200)
                .then(res => {
                    assert(res.body, 'GET / works correctly');
                });
        });
    })

    describe("Find County NOIs", () => {
        it("returns NOI's from the specified counties", async () => {
            return supertest(app)
                .get('/findCountyNOI')
                .query({
                    counties: 1
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(200)
                .then(res => {
                    assert(Array.isArray(res.body), true);
                    if (res.body.length > 0) {
                        assert(res.body[0].county_cd, '1');
                    }
                })
        });
        // it("does not return information from invalid counties", async () => {
        //     return supertest(app)
        //         .get('/findCountyNOI')
        //         .query({
        //             counties: 0
        //         })
        //         .set('Accept', 'application/json')
        //         .then(res => {
        //             console.log(res.body)
        //             assert(res.body, "hello")
        //             assert(Array.isArray(res.body), true);
        //             if (res.body.length > 0) {
        //                 assert(res.body[0].county_cd, '1');
        //             }
        //         })
        // });
    })

});