/***
 * 코드 최초 작성자 : 이영재
 * 코드 최초 작성일 : 2024.03.10.
 * 코드 설명:
 * 사용자 로그인을 위한 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

router.get("/", async (req, res, next) => {
  if (req.session.User_ID) {
    let conn;
    try {
      conn = await DBconn.getConnection();
      const [UserInfo] = await conn.query(
        `
        SELECT User_ID, User_Name, User_Email, Profile_Img
        FROM User_Info
        WHERE User_ID = ?
        `,
        [req.session.User_ID]
      );
      UserInfo.Profile_Img = "http://triptracks.co.kr/imgserver/" + UserInfo.Profile_Img;
      res.send({ isLogin: true, UserInfo });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "로그인 중 오류가 발생했습니다." });
    }
  } else {
    res.send({ isLogin: false });
  }
});

module.exports = router;
