const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "DBNAME",
});
module.exports = conn;
