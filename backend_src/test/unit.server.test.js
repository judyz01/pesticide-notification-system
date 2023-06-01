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
    const testStartDate = "2019-06-01";
    const testEndDate = "2019-06-30";
    const badEndDate = "2019-06-31";
    const testOrderParam = "distance";
    const testReqOrder = "ASC";
    const testInsertData = {
        use_no: 12344321,
        prodno: 10533,
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
                this.post = sinon.stub(request, 'post').resolves({
                    'Content-Type': "text/html; charset=utf-8",
                    status: 200,
                    text: 'NOI Table updated. Not a fumigant, so no immediate text notification.'
                })
            })
            afterEach(() => {
                sinon.restore();
            });

            it("Should successfully insert", (done) => {
                supertest(app)
                    .post('/addTableNOI')
                    .send(testInsertData)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .then(res => {
                        assert.equal(res.text, 'NOI Table updated. Not a fumigant, so no immediate text notification.');
                    })
                done();
            })
        });
        // describe("Bad Path", () => {
        //     beforeEach(() => {
        //         this.post = sinon.stub(request, 'post').resolves({
        //             'Content-Type': "text/html; charset=utf-8",
        //             status: 200,
        //             text: 'NOI Table updated. Not a fumigant, so no immediate text notification.'
        //         })
        //     })
        //     afterEach(() => {
        //         sinon.restore();
        //     })
        // })
    })

    describe("SMS", () => {
        describe("English Lines", () => {
            beforeEach(() => {
                this.post = sinon.stub(request, 'post').resolves({
                    'Content-Type': "text/html; charset=utf-8",
                    status: 200,
                    text: 'Information successfully sent.'
                })
            })
            afterEach(() => {
                sinon.restore();
            })
            it("Should respond with the guide", (done) => {
                supertest(app)
                    .post('/sms/in/en')
                    .send({
                        from: "testNumber",
                        Body: "guide",
                    })
                    .expect(200)
                    .then(res => {
                        assert.equal(res.text, "Information successfully sent.");
                    })
                done();
            })
        })
    })
});