/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.04.07.
 * 코드 설명:
 * 사용자 로그아웃을 위한 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");
const moment = require("moment");

router.get("/", async function (req, res, next) {
  var session = req.session;
  try {
    if (session.User_ID) {
      //세션정보가 존재하는 경우
      await req.session.destroy(function (err) {
        if (err) console.log(err);
        else {
          res.redirect("/");
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
  res.redirect("/");
});

module.exports = router;
