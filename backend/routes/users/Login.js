/***
 * 코드 최초 작성자 : 이영재
 * 코드 최초 작성일 : 2024.03.10.
 * 코드 설명:
 * 사용자 로그인을 위한 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");
const moment = require("moment");

router.post("/", async (req, res, next) => {
  const { user_Email, user_Passwd } = req.body;

  let conn;
  try {
    conn = await DBconn.getConnection();

    const selectResult = await conn.query("SELECT User_ID User_Pwd, User_Activate from User_Info WHERE User_Email=?", [
      user_Email,
    ]);

    if (selectResult.length > 0) {
      const { User_Pwd, User_Activate } = selectResult[0];
      if (User_Pwd === user_Passwd) {
        if (User_Activate) {
          req.session.User_ID = User_ID;
          console.log(`User_ID: ${req.session.User_ID} socketID: ${req.sessionID} 로그인성공`);
          return res.json({ success: true });
        } else return res.status(400).json({ success: false, err_Code: "DisabledAccount", err_msg: "비활성 계정" });
      } else {
        return res
          .status(400)
          .json({ success: false, err_Code: "PasswordDoesNotMatch", error: "비밀번호가 일치하지 않음" });
      }
    } else {
      return res.status(400).json({ success: false, err_Code: "EmailDoesNotExist", error: "이메일이 존재하지 않음" });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
