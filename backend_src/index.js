'use strict';
const functions = require('@google-cloud/functions-framework');
const express = require('express');
const create_unix_socket = require('./create_unix_socket.js');
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
  let latitude = req.query.latitude
  let longitude = req.query.longitude
  let radius = req.query.radius
  try {
    res.set('Access-Control-Allow-Origin', '*');
    if (!req.query.orderParam) {
      const noiList = await pool.raw('SELECT * FROM get_nearby_noi_data(?, ?, ?) ORDER BY applic_dt , applic_time', [latitude, longitude, radius]);
      res.status(200).json(noiList.rows)
    } else {
      let orderParam = req.query.orderParam
      const noiList = await pool.raw('SELECT * FROM get_nearby_noi_data(?, ?, ?) ORDER BY ??', [latitude, longitude, radius, orderParam]);
      res.status(200).json(noiList.rows)
    }
  } catch (err) {
    console.error(err)
    res.status(500).send(err + '\nError in request')
  }
});

functions.http('api', app);