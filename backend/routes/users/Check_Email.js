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
  const { user_Email } = req.body;

  let conn;
  try {
    conn = await DBconn.getConnection();

    const selectResult = await conn.query("SELECT User_Email from User_Info WHERE User_Email=?", [user_Email]);

    if (selectResult.length > 0) {
      return res.status(400).json({ success: false, err_Code:'EmailAlreadyExists', error: "이메일이 이미 사용중" });
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log(`[${req.ip}] - ${user_Email} 중복체크 처리 완료`)
  }
});

module.exports = router;
