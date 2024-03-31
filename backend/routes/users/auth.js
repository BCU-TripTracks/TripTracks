/***
 * 코드 최초 작성자 : 이영재
 * 코드 최초 작성일 : 2024.03.10.
 * 코드 설명:
 * 사용자 로그인을 위한 API 스크립트
 */

var express = require("express");
var router = express.Router();

router.post("/", async (req, res, next) => {
  if (req.session.userEmail) {
    res.send({ isLogin: true });
  } else {
    res.send({ isLogin: false });
  }
});

module.exports = router;
