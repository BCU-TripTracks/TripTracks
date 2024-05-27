/***
 * 코드 최초 작성자 : 이영재
 * 코드 최초 작성일 : 2024.03.10.
 * 코드 설명:
 * 사용자 권한 레벨을 확인하는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const pool = require("../../utils/DBconn");

router.get("/", async (req, res, next) => {
  console.log(req.sessionID);
  if (!req.session.User_ID) return res.status(200).json({ success: false, msg: "로그인이 필요합니다." });
  const { User_ID } = req.session;

  console.log(User_ID);
  let conn;
  try {
    conn = await pool.getConnection();
    let [User_Info] = await conn.query("SELECT User_Rule FROM User_Info WHERE User_ID=?", [User_ID]);
    if (!User_Info) return res.status(200).json({ success: false, msg: "사용자 정보를 찾을 수 없습니다." });
    return res.status(200).json({ success: true, Rule: User_Info.User_Rule });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, msg: "서버 오류" });
  } finally {
    if (conn) conn.end();
    return console.log("DB Connection closed");
  }
});

module.exports = router;
