const { Pool } = require("pg");

const credentials = new Pool({
  user: "admin",
  password: "tryagain1",
  host: "localhost",
  port: 5432,
  database: "ExpressShopDB",
  ssl: false
});

module.exports = credentials;