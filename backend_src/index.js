'use strict';
const functions = require('@google-cloud/functions-framework');
const express = require('express');
const county_lookup = require('./county_lookup.js');
const create_unix_socket = require('./create_unix_socket.js');
const twilio_functions = require('./twilio_functions.js')
require('dotenv').config()

const app = express()

// Automatically parse request body as form data.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let pool;

// initialize SQL Pool
app.use(async (req, res, next) => {
  if (pool) {
    return next();
  }
  try {
    pool = await createPool();
    next();
  } catch (err) {
    return next(err);
  }
});

// Initialize Knex, a Node.js SQL query builder library with built-in connection pooling.
const createPool = async () => {
  // Configure which instance and what database user to connect with.
  const config = { pool: {} };

  // [START cloud_sql_postgres_knex_limit]
  // 'max' limits the total number of concurrent connections this pool will keep. Ideal
  // values for this setting are highly variable on app design, infrastructure, and database.
  config.pool.max = 5;
  // 'min' is the minimum number of idle connections Knex maintains in the pool.
  // Additional connections will be established to meet this value unless the pool is full.
  config.pool.min = 5;
  // [END cloud_sql_postgres_knex_limit]

  // [START cloud_sql_postgres_knex_timeout]
  // 'acquireTimeoutMillis' is the number of milliseconds before a timeout occurs when acquiring a
  // connection from the pool. This is slightly different from connectionTimeout, because acquiring
  // a pool connection does not always involve making a new connection, and may include multiple retries.
  // when making a connection
  config.pool.acquireTimeoutMillis = 60000; // 60 seconds
  // 'createTimeoutMillis` is the maximum number of milliseconds to wait trying to establish an
  // initial connection before retrying.
  // After acquireTimeoutMillis has passed, a timeout exception will be thrown.
  config.pool.createTimeoutMillis = 30000; // 30 seconds
  // 'idleTimeoutMillis' is the number of milliseconds a connection must sit idle in the pool
  // and not be checked out before it is automatically closed.
  config.pool.idleTimeoutMillis = 600000; // 10 minutes
  // [END cloud_sql_postgres_knex_timeout]

  // [START cloud_sql_postgres_knex_backoff]
  // 'knex' uses a built-in retry strategy which does not implement backoff.
  // 'createRetryIntervalMillis' is how long to idle after failed connection creation before trying again
  config.pool.createRetryIntervalMillis = 200; // 0.2 seconds
  // [END cloud_sql_postgres_knex_backoff]

  if (process.env.INSTANCE_UNIX_SOCKET) {
    // Use a Unix socket when INSTANCE_UNIX_SOCKET (e.g., /cloudsql/proj:region:instance) is defined.
    return create_unix_socket(config);
  } else {
    throw 'INSTANCE_UNIX_SOCKET` is required.';
  }
};

/**
 * HTTP function to test if API is working
 */
app.get('/', (req, res) => {
  res.status(200).send("GET / works correctly");
});

/**
 * HTTP function that finds NOI's applied within a radius of a coordinate location
 * Parameters:
 *  req.query.latitude Location's latitude value
 *  req.query.longitude Location's longitude value
 *  req.query.radius Radius to search within
 * Return Value:
 *  JSON List of nearby NOI's and their relevant information 
*/
app.get('/findNearbyNOI', async (req, res) => {
  pool = pool || (await createPool());
  let latitude = req.query.latitude;
  let longitude = req.query.longitude;
  let radius = req.query.radius;
  let orderParam = req.query.orderParam;
  let order = req.query.order;
  try {
    res.set('Access-Control-Allow-Origin', '*');
    if (!orderParam) {
      const noiList = await pool.raw('SELECT * FROM get_nearby_noi_data(?, ?, ?) ORDER BY applic_dt ?, applic_time ?', [latitude, longitude, radius, pool.raw(order), pool.raw(order)]);
      res.status(200).json(noiList.rows);
    } else {
      const noiList = await pool.raw('SELECT * FROM get_nearby_noi_data(?, ?, ?) ORDER BY ?? ?', [latitude, longitude, radius, orderParam, pool.raw(order)]);
      res.status(200).json(noiList.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error in request');
  }
});

/* Endpoint for future use for adding NOI information to 
the database *reference Pesticide Use Report Data User Guide & Documentation*
Parameters:
  req.body.use_no - System assigned sequential number to uniquely identify a pesicide product use record within a year
  req.body.prodno - System assigned sequential number to uniquely identify a pesticide product
  req.body.chem_code - Identifies the active ingredient (AI) contained in the applied product
  req.body.prodchem_pct - The percentage of active ingredient found in the product as shown on the product label
  req.body.lbs_chm_used - Pounds of the active ingredient (AI) in the applied product
  req.body.lbs_prd_used - Pounds of product applied
  req.body.amt_prd_used - Amount of product reported used
  req.body.unit_of_meas - Refers to the unit of measure in conjunction with the reported AMT_PRD_USED field
  req.body.acre_planted - Size of field, or other unit
  req.body.unit_treated - Refers to the type of units planted in conjunction with the reported ACRE_PLANTED field.
  req.body.applic_cnt - Total number of applications for each product used by an operator performed during the reporting month as noted on a non-production monthly summary report
  req.body.applic_dt - Date that the pesticide product was applied
  req.body.applic_time - Time that the pesticide product application was completed
  req.body.county_cd - County code established by numbering an alphabetized list of California's 58 counties
  req.body.base_ln_mer - Public Lands Survey (PLS) System Base Line & Meridian for the application location
  req.body.township - Number of the township in the Public Land Survey System where the application occurred
  req.body.tship_dir - Public Land Survey System direction from a base line
  req.body.range - Number of the range within the Public Land Survey System where the application occurred
  req.body.range_dir - Public Land Survey System direction for the range where an application was reported
  req.body.section - An area of approximately one square mile (640 acres) within the Public Land Survey System where the pesticide application occurred
  req.body.site_loc_id - A code assigned by the County Agricultural Commissioner (CAC) on the use permit which indicates a particular location (field) where an application may occur
  req.body.grower_id - Number assigned to a grower or property operator by the County Agricultural Commissioner
  req.body.license_no - PCO license number
  req.body.planting_seq - Number to indicate multiple plantings of the same crop or commodity at the same SITE_LOC_ID
  req.body.aer_gnd_ind - Indicates whether the product was applied by air, ground, or other equipment
  req.body.site_code - Indicates the target site to which a pesticide product was applied
  req.body.qualify_cd - The qualifier code modifies or limits the meaning of the site code upon which the product was applied
  req.body.batch_no - Sequential number assigned to a file during the download process
  req.body.document_no - Internal sequential tracking number (non-unique) assigned at the time of data entry
  req.body.summary_cd - The line number found within the document for most record types
  req.body.record_id - Identifies the agency that input a use record, and whether the record is for an individual application or is summarized data
  req.body.comtrs - trs information
  req.body.error_flag - error flag *reference available through PUR database*
Return Value:
  JSON message "Successfully added" */

  app.post('/addTableNOI', async function(req, res) {
    pool = pool || (await createPool());
    let use_no = req.body.use_no
    let prodno = req.body.prodno
    let chem_code = req.body.chem_code
    let prodchem_pct = req.body.prodchem_pct
    let lbs_chm_used = req.body.lbs_chm_used
    let lbs_prd_used = req.body.lbs_prd_used
    let amt_prd_used = req.body.amt_prd_used
    let unit_of_meas = req.body.unit_of_meas
    let acre_planted = req.body.acre_planted
    let unit_treated = req.body.unit_treated 
    let applic_cnt = req.body.applic_cnt
    let applic_dt = req.body.applic_dt
    let applic_time = req.body.applic_time
    let county_cd = req.body.county_cd
    let base_ln_mer = req.body.base_ln_mer
    let township = req.body.township
    let tship_dir = req.body.tship_dir
    let range = req.body.range
    let range_dir = req.body.range_dir
    let section = req.body.section
    let site_loc_id = req.body.site_loc_id
    let grower_id = req.body.grower_id
    let license_no = req.body.license_no
    let planting_seq = req.body.planting_seq
    let aer_gnd_ind = req.body.aer_gnd_ind
    let site_code = req.body.site_code
    let qualify_cd = req.body.qualify_cd
    let batch_no = req.body.batch_no
    let document_no = req.body.document_no
    let summary_cd = req.body.summary_cd
    let record_id = req.body.record_id
    let comtrs = req.body.comtrs
    let error_flag = req.body.error_flag
    try {
      const noiList = 
        await pool.raw(
        'INSERT INTO udc19_50(use_no, prodno, chem_code, prodchem_pct, lbs_chm_used, lbs_prd_used, amt_prd_used, unit_of_meas, acre_planted, unit_treated, applic_cnt, applic_dt, applic_time, county_cd, base_ln_mer, township, tship_dir, range, range_dir, section, site_loc_id, grower_id, license_no, planting_seq, aer_gnd_ind,site_code, qualify_cd, batch_no, document_no, summary_cd, record_id, comtrs, error_flag) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [use_no, prodno, chem_code, prodchem_pct, lbs_chm_used, lbs_prd_used, amt_prd_used, unit_of_meas,
          acre_planted, unit_treated, applic_cnt, applic_dt, applic_time, county_cd, base_ln_mer, township, 
          tship_dir, range, range_dir, section, site_loc_id, grower_id, license_no, planting_seq, aer_gnd_ind,
          site_code, qualify_cd, batch_no, document_no, summary_cd, record_id, comtrs, error_flag])
      res.status(200).json({message: "Successfully added", status: 200})
    } catch (err) {
      console.error(err)
      res.status(500).send('Error in request')
    }
  });

/**
 * Webhook called by Twilio on receipt of text message which
 * subscribes a user to our SMS notification system, 
 * and adds user phone number to database.
 * Parameters:
 *  req.query.latitude Location's latitude value
 *  req.query.longitude Location's longitude value
 *  req.query.radius Radius to search within
 * Return Value:
 *  JSON List of nearby NOI's and their relevant information 
*/
app.post('/sms/subscribe', async (req, res) => {
  let tableName = 'subscribers_';
  let countyNumber = 0;

  // Parse incoming text
  const tokens = req.body.Body.split(" ");
  if (tokens[0] == 'SUBSCRIBE' && tokens.length == 2) {
    countyNumber = county_lookup(tokens[1]);
  }
  if (countyNumber != 0) {
    tableName = tableName+=countyNumber;
  }

  // Add users to subscription list, and send confirmation text.
  try {
    res.set('Access-Control-Allow-Origin', '*');
    pool = (pool || createPool());
    const insert = await pool.raw('INSERT INTO ?? (phone_number, language) VALUES (?, ?)', [tableName, req.body.From, 'English']);
    twilio_functions.sendSubscribeConfirmation(req, res, tokens[1]);
  } catch (err) {
    console.error(err);
    twilio_functions.sendSubscribeError(req, res, err);
  }
})

app.delete('/sms/phoneNumbers', async(req, res) => {
  pool = pool || (await createPool());
  try {
    const query = await pool.raw('DELETE FROM subscribers_50');
    res.status(200).send("it worked");
  } catch (err) {
    console.error(err)
    res.status(500).send(err);
  }
})

app.get('/sms/sendNotifications', async (req, res) => {
  pool = pool || (await createPool());
  try {
    //const numbers = await pool.raw('SELECT * FROM subscribers50');
    const numbers = [
      // '+14082072865',
      // '+16262309800',
      // '+12078380638',
      '+14159489392'
    ]
    numbers.forEach(element => {
      twilio_functions.sendNotifications(element)
    })
    res.status(200).send("Notifications sent")
  } catch (err) {
    console.error(err)
    res.status(500).send('Error sending notifications')
  }
});

functions.http('api', app);