/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.03.21.
 * 코드 설명:
 * 사용자 회원 가입을 위한 email 중복체크 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");
const moment = require("moment");

router.post("/", async (req, res, next) => {
  const { user_ID } = req.body;
  console.log(`user_ID: ${user_ID}`);
  let conn;
  try {
    conn = await DBconn.getConnection();

    const selectResult = await conn.query("SELECT User_ID from User_Info WHERE User_ID=?", [user_ID]);
    console.log(selectResult);
    if (selectResult.length > 0) {
      return res.status(400).json({ success: false, err_Code: "UserIDAlreadyExists", error: "아이디가 이미 사용중" });
    } else {
      return res.json({ success: true });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
