const request = require('request');
const assert = require('assert');
const supertest = require('supertest');
const app = require('../index.js').app;
const server = require('../index.js');
const sinon = require('sinon');
const knex = require('../create_unix_socket.js');
const { expect } = require('chai');
const proxyquire = require('proxyquire')

describe("Backend API", () => {
    const testCountyValid = 57;
    const testCountyInvalid = 0;
    const testLatitude = 37.5114;
    const testLongitude = -120.81;
    const testRadius = 20000;
    const testStartDate = "2019-06-01";
    const testEndDate = "2019-06-30";
    const badEndDate = "2019-06-31";
    const testOrderParam = "distance";
    const testReqOrder = "ASC";
    const testFumigant = 10533;
    const testNonFumigant = 61852;
    let testInsertData = {
        use_no: 12344321,
        prodno: 0,
        chem_code: 385,
        prodchem_pct: 1,
        lbs_chm_used: 1,
        lbs_prd_used: 1,
        amt_prd_used: 1,
        unit_of_meas: 'LB',
        acre_planted: 1,
        unit_treated: 'A',
        applic_cnt: 1,
        applic_dt: "2023-04-01",
        applic_time: 1100,
        county_cd: 57,
        base_ln_mer: 'M',
        township: 10,
        tship_dir: 'N',
        range: 1,
        range_dir: 'E',
        section: 34,
        site_loc_id: "123abc",
        grower_id: 123,
        license_no: 1,
        planting_seq: 1,
        aer_gnd_ind: 'G',
        site_code: 123,
        qualify_cd: 0,
        batch_no: 1,
        document_no: 1,
        summary_cd: 1,
        record_id: 1,
        comtrs: "57M10N03E06",
        error_flag: ""
    }
    const testNumber = '+12025550190'

    describe("API endpoint sanity check", () => {
        it("returns 'GET / works correctly'", async () => {
            const response = await supertest(app)
                .get('/')
                .set('Accept', 'application/json')
            expect(response.status).equal(200);
            expect(response.text).equal('GET / works correctly');
        });
    })

    describe("Bad endpoint", () => {
        it("returns 404 when the endpoint isn't valid", async () => {
            const response = await supertest(app)
                .get('/fake')
            expect(response.status).equal(404);
            expect(response.text).equal("Unable to locate resource. Please try again.");
        })
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
                done()
            });

            it("uses the date range filter", (done) => {
                supertest(app)
                    .get('/findCountyNOI')
                    .query({
                        counties: testCountyValid,
                        startDate: testStartDate,
                        endDate: testEndDate
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
            })
        })
        describe("Invalid", () => {
            // beforeEach(() => {
            //     const promise = sinon.stub().resolves("Query executed")
            //     const pool = sinon.stub().returns({
            //         raw: promise
            //     })
            //     this.currentTest.myStub = promise;
            // });
            afterEach(() => {
                sinon.restore();
            });
            it("does not return information from invalid counties", async () => {
                const response = await supertest(app)
                    .get('/findCountyNOI')
                    .query({
                        counties: testCountyInvalid
                    })
                    .set('Accept', 'application/json')
                expect(response.status).equal(200);
                assert.equal(Array.isArray(response.body), true);
                if (response.body.length > 0) {
                    assert.equal(response.body[0].county_cd, '1');
                }
            });

            it("does not return values without the 3 required parameters", async () => {
                const response = await supertest(app)
                    .get('/findNearbyNOI')
                    .set('Accept', 'application/json')
                expect(response.status).equal(500);
                expect(response.text).equal('Error in request: findNearbyNOI')
            });
        })
    })

    describe("Nearby", () => {
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
                    .get('/findNearbyNOI')
                    .query({
                        latitude: testLatitude,
                        longitude: testLongitude,
                        radius: testRadius
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
                done()
            });

            it("uses the provided order parameter", (done) => {
                supertest(app)
                    .get('/findCountyNOI')
                    .query({
                        counties: testCountyValid,
                        startDate: testStartDate,
                        endDate: testEndDate,
                        orderParam: "distance",
                        reqOrder: "ASC"
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', "application/json; charset=utf-8")
                    .expect(200)
                    .then(res => {
                        assert.equal(Array.isArray(res.body), true);
                        if (res.body.length > 0) {
                            assert.equal(res.body[0].reqOrder, 'ASC');
                            assert.equal(res.body[0].orderParam, "distance");
                        }
                    })
                done();
            })
        })
    })

    describe("Add to Table NOI", () => {
        describe("Happy Path", () => {
            beforeEach(() => {
                // this.post = sinon.stub(supertest, 'post').resolves({
                //     'Content-Type': "text/html; charset=utf-8",
                //     status: 200,
                //     text: 'NOI Table updated. Not a fumigant, so no immediate text notification.'
                // })
            })
            afterEach(() => {
                sinon.restore();
            });

            it("Should successfully insert", async () => {
                testInsertData.prodno = testFumigant;
                const response = await supertest(app)
                    .post('/addTableNOI')
                    .send(testInsertData)
                expect(response.status).equal(200);
                expect(response.text).equal('Notifications sent');
            })

            it("Should not send notifications when the pesticide is not a fumigant", async () => {
                testInsertData.prodno = testNonFumigant;
                const response = await supertest(app)
                    .post('/addTableNOI')
                    .send(testInsertData)
                expect(response.status).equal(200);
                expect(response.text).equal("NOI Table updated. Not a fumigant, so no immediate text notification.");
            })
        });
        describe("Bad Path", () => {
            beforeEach(() => {
                this.post = sinon.stub(request, 'post').resolves({
                    'Content-Type': "text/html; charset=utf-8",
                    status: 200,
                    text: 'NOI Table updated. Not a fumigant, so no immediate text notification.'
                })
            })
            afterEach(() => {
                sinon.restore();
            })
            it("Should not insert when values are not the correct type", async () => {
                testInsertData.prodno = "STRING";
                const response = await supertest(app)
                    .post('/addTableNOI')
                    .send(testInsertData)
                expect(response.status).equal(500);
                expect(response.text).equal('Error in request');
            })
        })
    })

    describe("SMS", () => {
        describe("English Line", () => {
            describe("Valid", () => {
                it("Should respond with a subscription confirmation", async () => {
                    const response = await supertest(app)
                        .post('/sms/in/en')
                        .send({
                            From: testNumber,
                            Body: "sub stanislaus",
                        })
                    expect(response.status).equal(200);
                    expect(response.text).equal("Subscription successful.")
                })

                it("Should respond with a unsubscription confirmation", async () => {
                    const response = await supertest(app)
                        .post('/sms/in/en')
                        .send({
                            From: testNumber,
                            Body: "halt stanislaus",
                        })
                    expect(response.status).equal(200);
                    expect(response.text).equal("Unsubscription successful.");
                })

                it("Should respond with the guide", async () => {
                    const response = await supertest(app)
                        .post('/sms/in/en')
                        .send({
                            From: testNumber,
                            Body: "guide",
                        })
                    expect(response.status).equal(200);
                    expect(response.text).equal("Information successfully sent.");
                })
            })
            describe("Invalid", () => {
                it("Should respond to invalid single word commands with the error message", async () => {
                    const response = await supertest(app)
                        .post('/sms/in/en')
                        .send({
                            From: testNumber,
                            Body: "invalid",
                        })
                    expect(response.status).equal(500);
                    expect(response.text).equal("Error parsing command. Invalid keyword.")
                })
                it("Should respond to an invalid multi-word command with the correct error message", async () => {
                    const response = await supertest(app)
                        .post('/sms/in/en')
                        .send({
                            From: testNumber,
                            Body: "fake command",
                        })
                    expect(response.status).equal(500);
                    expect(response.text, "Invalid command fake command");
                })
                it("Should respond to an invalid county with the correct error", async () => {
                    const response = await supertest(app)
                        .post('/sms/in/en')
                        .send({
                            From: testNumber,
                            Body: "sub orlando"
                        })
                    expect(response.status).equal(500);
                    expect(response.text, "Invalid county. Error subscribing")
                })
            })
        })
    })
});