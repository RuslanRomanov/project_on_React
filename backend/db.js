const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'lab_project',
});

pool.on('error', (err) => {
    console.error('Неожиданная ошибка подключения к PostgreSQL', err);
});

module.exports = pool;
