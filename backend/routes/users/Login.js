/***
 * 코드 최초 작성자 : 이영재
 * 코드 최초 작성일 : 2024.03.10.
 * 코드 설명:
 * 사용자 로그인을 위한 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

router.post("/", async (req, res, next) => {
  const { user_Email, user_Passwd } = req.body;

  let conn;
  try {
    conn = await DBconn.getConnection();

    const selectResult = await conn.query("SELECT User_Pwd from User_Info WHERE User_Email=?", [user_Email]);

    if (selectResult.length > 0) {
      if (selectResult[0].User_Pwd === user_Passwd) {
        res.json({ success: true, user_Email: user_Email });
      } else {
        res.status(400).json({ error: "비밀번호가 일치하지 않음" });
      }
    } else {
      res.status(400).json({ error: "이메일이 존재하지 않음" });
    }

    // res.json({success: true, user_Email: user_Email, user_Passwd});
  } catch (error) {
    console.log(error);
  } finally {
  }
});

module.exports = router;
