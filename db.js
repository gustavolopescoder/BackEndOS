require("dotenv").config();
const { Pool } = require("pg");

// Usar DATABASE_URL (Railway) se existir, senão usar variáveis separadas (local)
const connectionString = process.env.DATABASE_URL;

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false }, // para Railway e outros serviços com SSL
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
