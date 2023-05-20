const request = require('request');
const assert = require('assert');
const supertest = require('supertest');
const app = require('../index.js').app;
const pool = require('../index.js').pool;
const sinon = require('sinon');
const knex = require('../create_unix_socket.js');
const { expect } = require('chai');

describe("Backend API", () => {
    const testCountyValid = 57;
    const testCountyInvalid = 0;
    const testLatitude = 37.5114;
    const testLongitude = -120.81;
    const testRadius = 20000;

    describe("API endpoint sanity check", () => {
        it("returns 'GET / works correctly'", () => {
            return supertest(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', "text/html; charset=utf-8")
                .expect(res => {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, 'GET / works correctly');
                });
        });
    })

    describe("Find County NOIs", () => {
        describe("Valid", () => {
            beforeEach(() => {
                this.get = sinon.stub(request, 'get').resolves({
                    statusCode: 200,
                    headers: {
                        'content-type': 'application/json; charset=utf-8'
                    },
                    body: [
                        {
                            use_no: 1234,
                            county_cd: 57
                        }
                    ]
                });
            })
            afterEach(() => {
                sinon.restore();
            })

            it("returns NOI's from the specified counties", (done) => {
                supertest(app)
                    .get('/findCountyNOI')
                    .query({
                        counties: testCountyValid
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', "application/json; charset=utf-8")
                    .expect(200)
                    .then(res => {
                        assert.equal(Array.isArray(res.body), true);
                        if (res.body.length > 0) {
                            assert.equal(res.body[0].county_cd, '57');
                        }
                    })
                done();
            });
        })
        describe("Invalid", () => {
            beforeEach(() => {
                this.get = sinon.stub(request, 'get').resolves({
                    'Content-Type': "text/html; charset=utf-8",
                    status: 500,
                    text: 'Error in request: findCountyNOI'
                })
            });
            afterEach(() => {
                sinon.restore();
            });
            it("does not return information from invalid counties", async () => {
                return supertest(app)
                    .get('/findCountyNOI')
                    .query({
                        counties: testCountyInvalid
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', "application/json; charset=utf-8")
                    .then(res => {
                        assert.ok(res.body, [])
                        assert.equal(Array.isArray(res.body), true);
                        if (res.body.length > 0) {
                            assert.equal(res.body[0].county_cd, '1');
                        }
                    })
            });
        })
    })

    describe("Find Nearby NOIs", () => {
        describe("Valid", () => {
            beforeEach(() => {
                this.get = sinon.stub(request, 'get').resolves({
                    'Content-Type': "application/json; charset=utf-8",
                    status: 200,
                    body: [
                        {
                            use_no: 1234,
                            county_cd: 57
                        }
                    ]
                })
            })
            afterEach(() => {
                sinon.restore();
            })
            it("returns a json list of nearby NOI's", () => {
                supertest(app)
                    .get('/findNearbyNOI')
                    .query({
                        longitude: testLongitude,
                        latitude: testLatitude,
                        radius: testRadius
                    })
                    .set('Accept', 'application/json')
                    .expect(res => {
                        assert.equal(res.status, 200);
                    })
            });
        })
        describe("Invalid", () => {
            beforeEach(() => {
                this.get = sinon.stub(request, 'get').resolves({
                    'Content-Type': "text/html; charset=utf-8",
                    status: 500,
                    text: 'Error in request: findNearbyNOI'
                })
            })
            afterEach(() => {
                sinon.restore();
            })
            it("does not return values without the 3 required parameters", () => {
                supertest(app)
                    .get('/findNearbyNOI')
                    .set('Accept', 'application/json')
                    .expect((res) => {
                        assert.equal(res.status, 500);
                        assert.equal(res.text, 'Error in request: findNearbyNOI');
                    })
            });
        })
    })
});