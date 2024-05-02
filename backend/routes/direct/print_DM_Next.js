/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.05.02.
 * 코드 설명:
 * DM출력
 */

const express = require("express");
const router = express.Router();
const db = require("../../utils/DBconn");

// 특정 방의 추가 채팅 내역 조회 API
router.post("/", async (req, res) => {
  const { Room_ID, Last_Chat } = req.body;
  const User_ID = req.session.User_ID;
  let conn;
  try {
    conn = await db.getConnection();

    //해당 아래줄을 변경해야하는데 필요한 것은 Last_Chat은 Message_ID (PK)를 기준으로 그 이후의 20개의 채팅을 가져오는 것이다.
    const Messages = await conn.query(
      `SELECT * FROM DM_Message WHERE Room_ID = ? AND Message_ID > ? ORDER BY Timestamp DESC LIMIT 20`,
      [Room_ID, Last_Chat]
    );

    if (Messages.length === 0) return res.json({ success: false, msg: "정보가 없습니다." }); // 메시지가 없을 경우
    const ResultMessages = [];
    for (const Msg of Messages) {
      await ResultMessages.push({
        Message_ID: Msg.Message_ID,
        Type: Msg.Sender_ID === User_ID ? "M" : "Y",
        Message: Msg.Content,
        Time: Msg.timestamp,
      });
    }
    ResultMessages.reverse();
    res.json({ ResultMessages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "채팅 내역을 가져오는 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
