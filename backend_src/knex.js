'use strict'
const Knex = require('knex');
require('dotenv').config();

const knex = Knex({
  client: 'pg',
  connection: {
    user: process.env.DB_USER, // e.g. 'my-user'
    password: process.env.DB_PASS, // e.g. 'my-user-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    host: process.env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
  },
  // ... Specify additional properties here.
  acquireConnectionTimeout: 600000,
  pool: {
    max: 1,
    min: 0,
    acquireTimeoutMillis: 60000,
    createTimeoutMillis: 10000,
    idleTimeoutMillis: 1,
    createRetryIntervalMillis: 200
  }
});
module.exports = knex;