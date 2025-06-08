const { Pool } = require('pg');
require('dotenv').config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err.message, err.stack);
    return;
  }
  console.log('Berhasil terhubung ke database');
  release();
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client:', err.message, err.stack);
  setTimeout(() => pool.connect(), 1000);
});

module.exports = pool;