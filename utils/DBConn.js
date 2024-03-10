// utils/DBconn.js
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "dudwo2001!",
  database: "bcu_triptacks",
  connectionLimit: 5, // 동시에 유지할 수 있는 최대 연결 수
});

console.log("DB Connection Pool Created: " + pool);

module.exports = pool;
