const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'diplomdb',
  password: '55685568',
  port: 5432,
});

module.exports = pool;
