/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.03.24.
 * 코드 설명:
 * 사용자 회원 가입을 위한 Tag 상위 10개 노출을 위한 API 스크립트
 */
var express = require("express");
var router = express.Router();
const pool = require("../../utils/DBconn");

router.post("/", async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();

    const topTags = await conn.query("SELECT Tag_Name, View_Count FROM Tag_Info ORDER BY View_Count DESC LIMIT 10");

    return res.status(200).send({ Result: "Success", TopTags: topTags });
  }catch(error){
    return res.status(400).send({Result: "태그연결 실패", Error: tagerror});
  }
});

module.exports = router;