'use strict';
const functions = require('@google-cloud/functions-framework');
const express = require('express');
const axios = require('axios');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

const county_functions = require('./county_functions.js');
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
  config.pool.max = 1;
  // 'min' is the minimum number of idle connections Knex maintains in the pool.
  // Additional connections will be established to meet this value unless the pool is full.
  config.pool.min = 1;
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

// API Endpoint test
app.get('/', (req, res) => {
  res.status(200).send("GET / works correctly");
});

/**
 * HTTP function that finds NOI's applied within (a) given county/counties
 * Parameters:
 *  req.query.counties: County/counties to look through
 *  req.query.order: ASC or DESC order for application date
 *  req.query.startDate: The first date of NOI's returned
 *  req.query.endDate: The last date of NOI's returned
 * Return Value:
 *  JSON List of NOI's and their relevant information 
*/
app.get('/findCountyNOI', async (req, res) => {
  pool = pool || (await createPool());

  let reqOrder = req.query.order
  if (!reqOrder) {
    reqOrder = 'ASC';
  }

  // Setup query for single or multiple counties
  let counties = req.query.counties;
  if (!Array.isArray(counties)) {
    counties = [counties]
  }

  // Date range query
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;

  try {
    res.set('Access-Control-Allow-Origin', '*');
    const noiList = await pool.distinct('restricted_noi_view.use_no', 'prodno', 'product_name', 'aer_grnd_ind', 'fumigant_sw',
      'chem_code', 'chemname', 'acre_treated', 'unit_treated', 'applic_dt',
      'applic_time', 'aer_gnd_ind', 'county_cd', 'county_name', 'latitude', 'longitude')
      .from('restricted_noi_view')
      .innerJoin('coordinates_view', 'restricted_noi_view.use_no', '=', 'coordinates_view.use_no')
      .whereIn('county_cd', counties)
      .modify((pool) => {
        if (startDate) {
          pool.whereRaw('applic_dt > ?', [startDate])
        }
        if (endDate) {
          pool.whereRaw('applic_dt < ?', [endDate])
        }
      })
      .orderBy([
        { column: 'applic_dt', order: reqOrder },
        { column: 'applic_time', order: reqOrder }
      ])

    // Return list of NOI's
    res.status(200).json(noiList);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error in request: findCountyNOI');
  }
});

/**
 * HTTP function that finds NOI's applied within a radius of a coordinate location
 * Parameters:
 *  req.query.latitude: Location's latitude value
 *  req.query.longitude: Location's longitude value
 *  req.query.radius: Radius to search within
 *  req.query.counties: List of counties to look within
 *  req.query.orderParam: The parameter to sort the NOI data [distance, applic_dt/applic_time (default)]
 *  req.query.order: Whether data should be sorted in ascending or descending order
 * Return Value:
 *  JSON List of nearby NOI's and their relevant information 
*/
app.get('/findNearbyNOI', async (req, res) => {
  pool = pool || (await createPool());
  let latitude = req.query.latitude;
  let longitude = req.query.longitude;
  let radius = req.query.radius;
  let orderParam = req.query.orderParam;
  let reqOrder = req.query.order;
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;

  try {
    res.set('Access-Control-Allow-Origin', '*');

    const noiList = await pool.select(pool.raw('* FROM find_nearby_noi_data(?, ?, ?)', [latitude, longitude, radius]))
      .modify((pool) => {
        // Sort
        if (orderParam === "distance") {
          pool.orderBy([
            { column: 'distance', order: reqOrder },
          ])
        } else {
          pool.orderBy([
            { column: 'applic_dt', order: reqOrder },
            { column: 'applic_time', order: reqOrder }
          ])
        }

        // Date range filter
        if (startDate) {
          pool.whereRaw('applic_dt > ?', [startDate])
        }
        if (endDate) {
          pool.whereRaw('applic_dt < ?', [endDate])
        }
      })
    res.status(200).json(noiList);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error in request: findNearbyNOI');
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

app.post('/addTableNOI', async function (req, res, next) {
  pool = pool || (await createPool());
  let tablename = 'noi'
  let restricted = 'restricted_products'
  let preset_link = 'https://apps.cdpr.ca.gov/cgi-bin/label/label.pl?typ=pir&prodno='
  try {
    res.set('Access-Control-Allow-Origin', '*');

    const noiList =
      await pool.raw(
        'INSERT INTO ??(use_no, prodno, chem_code, prodchem_pct, lbs_chm_used, lbs_prd_used, amt_prd_used, unit_of_meas,\
          acre_planted, unit_treated, applic_cnt, applic_dt, applic_time, county_cd, base_ln_mer, township, tship_dir, range,\
          range_dir, section, site_loc_id, grower_id, license_no, planting_seq, aer_gnd_ind,site_code, qualify_cd, batch_no, document_no,\
          summary_cd, record_id, comtrs, error_flag)\
          VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [tablename, req.body.use_no, req.body.prodno, req.body.chem_code, req.body.prodchem_pct, req.body.lbs_chm_used,
          req.body.lbs_prd_used, req.body.amt_prd_used, req.body.unit_of_meas, req.body.acre_planted, req.body.unit_treated,
          req.body.applic_cnt, req.body.applic_dt, req.body.applic_time, req.body.county_cd, req.body.base_ln_mer, req.body.township,
          req.body.tship_dir, req.body.range, req.body.range_dir, req.body.section, req.body.site_loc_id, req.body.grower_id,
          req.body.license_no, req.body.planting_seq, req.body.aer_gnd_ind, req.body.site_code, req.body.qualify_cd, req.body.batch_no,
          req.body.document_no, req.body.summary_cd, req.body.record_id, req.body.comtrs, req.body.error_flag])

    const lookup = await pool.raw(
      'SELECT * FROM ?? WHERE prodno = ? AND fumigant_sw = ?',
      [restricted, req.body.prodno, 'X']
    )
    if (lookup.rows[0]) {
      req.product_name = lookup.rows[0].product_name
    } else {
      return res.status(200).send("NOI Table updated. Not a fumigant, so no immediate text notification.");
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send('Error in request')
  }
  next();
});

// Get lat and lon of new noi, add to table, then pass along to final step: send notif
app.post('/addTableNOI', async (req, res, next) => {
  const base_ln_mer = req.body.base_ln_mer
  const township = req.body.township
  const tship_dir = req.body.tship_dir
  const range = req.body.range
  const range_dir = req.body.range_dir
  const section = req.body.section
  const meridians = {
    "S": 27,
    "H": 15,
    "M": 21
  }
  const plssData = await axios.get(`https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer/exts/CadastralSpecialServices/GetLatLon?trs=CA+${meridians[base_ln_mer]}+T${township}${tship_dir}+R${range}${range_dir}+SEC+${section}&returnalllevels=false&f=pjson`);
  if (plssData.data.status == 'fail') {
    return res.status(500).send("Could not find land parcel with that TLSS data.");
  }
  const coordinates = plssData.data.coordinates[0];
  req.lat = coordinates.lat;
  req.lon = coordinates.lon;
  try {
    res.set('Access-Control-Allow-Origin', '*');
    pool = pool || (await createPool());
    const noiList = await pool.raw('INSERT INTO coordinates VALUES (?, ?, ?, ST_MakePoint(?, ?))', [req.body.use_no, req.lat, req.lon, req.lon, req.lat]);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
  next();
})

// Add an NOI to our database, and send notifications about this new application
app.post('/addTableNOI', async (req, res) => {
  pool = pool || (await createPool());
  const tableName = 'subscribers';
  let county_column = 'sub' + String(req.body.county_cd);
  try {
    res.set('Access-Control-Allow-Origin', '*');

    // Retrieve subscriber info in the format {phone_number, language}
    const users = await pool.select('phone_number', 'language')
      .from(tableName)
      .whereRaw('??=true', [county_column]);

    if (users.length) {
      // Send a notification to every user subscribed
      users.forEach(element => {
        twilio_functions.sendNotifications(i18next, element.phone_number, req.product_name, 'link', element.language, req.lat, req.lon)
      });

      res.status(200).send("Notifications sent")
    } else {
      res.status(200).send('No notifications sent; no users subscribed to this county.')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Error sending notifications')
  }
});

// SMS Notification System

// Middleware to parse which language of messaging service messaging service to use
app.use('/sms/in', (req, res, next) => {
  req.headers['accept-language'] = req.path.slice(1);
  next();
});

// Add internationalization to SMS Notification Service
i18next.use(Backend).use(middleware.LanguageDetector).init({
  fallbackLng: 'en',
  backend: {
    loadPath: './locales/{{lng}}/translation.json'
  },
  preload: ['en', 'sp']
});
app.use(middleware.handle(i18next));

/**
 * Webhook called by Twilio on receipt of text message which
 * handles their commands accordingly.
 * Parameters:
 * Body: body of text message received from users
 * Return Value:
 * Information regarding NOI's, or the NOI Notification System
*/
app.post('/sms/in/:lng', async (req, res) => {
  // Parse incoming text
  const tokens = req.body.Body.trim().replace(/\s+/g, ' ').toUpperCase().split(" ");
  const numTokens = tokens.length;

  if (numTokens > 2) {
    console.error("Error parsing command. Too many arguments.")
    twilio_functions.sendError(req, res, 'excess_keyword');
    res.status(500).send("Error parsing command. Too many arguments.")
    return
  }

  if (numTokens == 2) {
    handleMultiKeywordText(req, res, tokens);
  }

  if (numTokens == 1) {
    handleSingleKeywordText(req, res, tokens[0]);
  }
});

// Handle text messages with 1 keyword
const handleSingleKeywordText = (req, res, token) => {
  if (token == 'GUIDE') {
    twilio_functions.sendGuide(req, res);
    res.status(200).send("Information successfully sent.");
  } else {
    // Handle non-default SMS keywords
    if (!twilio_functions.optOutKeywords.has(token)) {
      twilio_functions.sendError(req, res, 'invalid_keyword');
      res.status(500).send("Error parsing command. Invalid keyword.")
    }
  }
}

// Handle text messages with 2 keywords
const handleMultiKeywordText = async (req, res, tokens) => {
  if (tokens[0] == 'SUB') {
    let subs = 'subscribers';
    let county_column = 'sub' + String(county_functions.county_lookup(tokens[1]));
    // Add users to subscription list, and send confirmation text.
    // Send error message otherwise.
    try {
      res.set('Access-Control-Allow-Origin', '*');
      pool = (pool || createPool());
      const lng = req.headers['accept-language']
      // Add to subscribers table
      await pool.raw('INSERT INTO ?? (phone_number, language, ??) VALUES (?, ?, ?) ON CONFLICT (phone_number)\
        DO UPDATE SET LANGUAGE=?, ??=?',
        [subs, county_column, req.body.From, lng, true,
          lng, county_column, true]);

      // Send confirmation reply to user
      twilio_functions.sendSubscribeConfirmation(req, res, tokens[1]);
      res.status(200).send("Subscription successful.");
    } catch (err) {
      console.error(err);
      twilio_functions.sendError(req, res, err.code);
      res.status(500).send("Error subscribing.");
      return
    }
  } else if (tokens[0] == 'HALT') {
    let tableName = 'subscribers';
    // Delete users to subscription list, and send confirmation text.
    // Send error message otherwise.
    try {
      res.set('Access-Control-Allow-Origin', '*');
      pool = (pool || createPool());
      let subscriber_string = 'sub' + String(county_functions.county_lookup(tokens[1]));
      // Toggle boolean for county specified
      await pool.raw('UPDATE ?? SET ?? = false WHERE phone_number = ?', [tableName, subscriber_string, req.body.From]);
      twilio_functions.sendUnsubscribeConfirmation(req, res, tokens[1]);
      res.status(200).send("Unsubscription successful.");
    } catch (err) {
      console.error(err);
      twilio_functions.sendError(req, res, err.code);
      res.status(500).send("Error subscribing.");
      return
    }
  } else {
    twilio_functions.sendError(req, res, "invalid_keyword")
    res.status(500).send(`Invalid command ${req.body.Body}`)
    return
  }
}

app.use((req, res) => {
  res.status(404).send("Unable to locate resource. Please try again.");
})

functions.http('api', app);
module.exports = app;