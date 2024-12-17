const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'gaviotas',
    database: 'joyas',
    port: 5432,
});

module.exports = pool;
