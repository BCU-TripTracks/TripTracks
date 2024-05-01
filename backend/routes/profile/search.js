/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.03.12.
 * 코드 설명:
 * 입력된 유저 이름을 통해 유저 프로필 조회를 위한 API 스크립트
 */

const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 입력된 유저 이름으로 유저 프로필 조회하는 API
router.get("/", async (req, res, next) => {
  const User_ID = req.query.User_ID;

  let conn;
  try {
    conn = await DBconn.getConnection();

    // User_Info 테이블에서 입력된 유저 이름에 해당하는 정보 조회
    const [userInfoResult] = await conn.query("SELECT * FROM User_Info WHERE User_ID = ?", [User_ID]);

    // 조회된 유저 정보가 없으면 404 에러 반환
    if (!userInfoResult || userInfoResult.length === 0) {
      return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    }

    // 조회된 유저 정보가 있으면 해당 유저의 정보를 반환
    const userInfo = userInfoResult[0];
    return res.json({ success: true, userInfo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "유저 프로필을 조회하는 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;