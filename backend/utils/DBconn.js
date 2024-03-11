// src/db/index.js
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "dudwo2001!",
  database: "bcu_triptracks",
  connectionLimit: 5, // 동시에 유지할 수 있는 최대 연결 수
  connectionTimeout: 10000,
});

// 연결 오류 처리
pool.getConnection()
  .then(conn => {
    console.log("Database connected!");
    conn.release(); // 연결 반환
  })
  .catch(err => {
    console.error("Database connection error:", err.message);
  });

module.exports = pool;
