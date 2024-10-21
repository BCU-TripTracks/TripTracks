/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.05.02.
 * 코드 설명:
 * DM방 목록 출력
 */

const express = require("express");
const router = express.Router();
const db = require("../../utils/DBconn");

// 특정 사용자가 속한 DM_Room 목록 조회 API
router.get("/", async (req, res) => {
  const user_Id = req.session.User_ID; // 세션에서 사용자 ID 가져오기
  const Rooms_Info = [];
  let conn;
  try {
    conn = await db.getConnection();
    const rooms = await db.query(`SELECT Room_ID FROM DM_Member WHERE User_ID=?`, [user_Id]);

    for (const room of rooms) {
      const roomData = {};
      const [targetID] = await db.query(`SELECT User_ID FROM DM_Member WHERE Room_ID=? AND NOT(User_ID=?)`, [
        room.Room_ID,
        user_Id,
      ]);
      if (!targetID.User_ID) return res.status(404).json({ message: "상대방 ID를 찾을 수 없습니다." });
      const [targetInfo] = await db.query(`SELECT User_Name, Profile_Img FROM User_Info WHERE User_ID=?`, [
        targetID.User_ID,
      ]);
      targetInfo.Profile_Img = "http://triptracks.co.kr/imgserver/" + targetInfo.Profile_Img;
      if (!targetID.User_ID) return res.status(404).json({ message: "상대방 정보를 찾을 수 없습니다." });
      const [lastMsg] = await db.query(
        `SELECT Content, timestamp, type FROM DM_Message WHERE Room_ID=? ORDER BY Timestamp DESC LIMIT 1`,
        [room.Room_ID]
      );
      roomData.Room_ID = room.Room_ID;
      roomData.User_Name = targetInfo.User_Name;
      roomData.Profile_Img = targetInfo.Profile_Img;
      if (lastMsg) {
        roomData.lastMessage = lastMsg.type == 1 ? "피드" : lastMsg.Content;
        roomData.lastMessageTime = lastMsg.timestamp;
      }
      Rooms_Info.push(roomData);
    }
    res.json({ Rooms_Info: Rooms_Info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "사용자가 속한 방 목록을 가져오는 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
