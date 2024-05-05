/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.05.02.
 * 코드 설명:
 * DM 전송
 */

const express = require("express");
const router = express.Router();
const db = require("../../utils/DBconn");

// DM_Message 전송 API
router.post("/", async (req, res) => {
  const User_ID = req.session.User_ID;
  const { Room_ID, Message } = req.body;
  let conn;
  try {
    conn = await db.getConnection();
    await db.query(`INSERT INTO DM_Message (Room_ID, Sender_ID, Content) VALUES (?, ?, ?)`, [
      Room_ID,
      User_ID,
      Message,
    ]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "메시지 전송 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
