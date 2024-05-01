/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.03.12.
 * 코드 설명:
 * 사용자 팔로우 관련 API 스크립트
 */

const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 사용자를 팔로우하는 API
router.post("/", async (req, res, next) => {
  const { fromUser } = req.body;
  const user_ID = req.session.User_ID;

  let conn;
  try {
    conn = await DBconn.getConnection();
    await conn.query("DELETE FROM Follow WHERE toUser_ID = ? AND fromUser_ID = ?", [user_ID, fromUser]);
    return res.json({ message: "언팔로우 성공" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "팔로우 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
