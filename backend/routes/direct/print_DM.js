/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.05.02.
 * 코드 설명:
 * DM출력
 */

const express = require("express");
const router = express.Router();
const db = require("../../utils/DBconn");

// 특정 방의 채팅 내역 조회 API
router.get("/:Room_ID", async (req, res) => {
  const Room_ID = req.params.Room_ID;
  const User_ID = req.session.User_ID;
  let conn;
  try {
    conn = await db.getConnection();
    const Messages = await conn.query(`SELECT * FROM DM_Message WHERE Room_ID = ? ORDER BY Timestamp ASC LIMIT 20`, [
      Room_ID,
    ]);

    if (Messages.length === 0) return res.json({ success: false, msg: "정보가 없습니다." }); // 메시지가 없을 경우

    const ResultMsg = [];
    for (const Msg of Messages) {
      ResultMsg.push({
        Type: Msg.User_ID === User_ID ? "M" : "Y",
        Message: Msg.Message,
        Time: Msg.Timestamp,
      });
    }

    res.json({ Messages: ResultMsg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "채팅 내역을 가져오는 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
