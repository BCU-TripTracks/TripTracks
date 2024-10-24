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
    const [targetID] = await conn.query(`SELECT User_ID FROM DM_Member WHERE Room_ID = ? AND NOT(User_ID = ?)`, [
      Room_ID,
      User_ID,
    ]);
    if (!targetID) return res.status(404).json({ message: "상대방 ID를 찾을 수 없습니다." });
    const [targetInfo] = await conn.query(`SELECT User_Name, Profile_Img FROM User_Info WHERE User_ID = ?`, [
      targetID.User_ID,
    ]);
    if (!targetInfo) return res.status(404).json({ message: "상대방 정보를 찾을 수 없습니다." });

    const Messages = await conn.query(`SELECT * FROM DM_Message WHERE Room_ID = ? ORDER BY Message_ID DESC LIMIT 20`, [
      Room_ID,
    ]);
    const ResultRoomChat = {
      Room_ID,
      User_ID: targetID.User_ID,
      User_Name: targetInfo.User_Name,
      Profile_Img: "http://triptracks.co.kr/imgServer/" + targetInfo.Profile_Img,
      Messages: [],
    };

    if (Messages.length > 0) {
      for (const Msg of Messages) {
        await ResultRoomChat.Messages.push({
          Message_ID: Msg.Message_ID,
          Type: Msg.Sender_ID === User_ID ? "M" : "Y",
          Message: Msg.Content,
          Time: Msg.timestamp,
          type: Msg.type,
        });
      }
      ResultRoomChat.Messages.reverse();
    }

    res.json({ ResultRoomChat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "채팅 내역을 가져오는 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
