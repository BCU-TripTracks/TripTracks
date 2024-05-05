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
router.post("/", async (req, res) => {
  const user_Id = req.session.User_ID; // 세션에서 사용자 ID 가져오기
  const { toUser_ID } = req.body;

  let conn;
  try {
    conn = await db.getConnection();
    const [room] = await conn.query(
      `
        SELECT Room_ID 
        FROM DM_Member 
        WHERE User_ID IN (?, ?)
        GROUP BY Room_ID
        HAVING COUNT(DISTINCT User_ID) = 2
      `,
      [user_Id, toUser_ID]
    );

    if (room) {
      return res.json({ success: true, Room_ID: room.Room_ID });
    } else {
      const insertRoom = await conn.query(`INSERT INTO DM_Room () VALUES ()`); // 방 생성
      const roomID = insertRoom.insertId;
      await conn.query(`INSERT INTO DM_Member (Room_ID, User_ID) VALUES (?, ?), (?, ?)`, [
        roomID,
        user_Id,
        roomID,
        toUser_ID,
      ]);
      return res.json({ success: true, Room_ID: roomID });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "사용자가 속한 방 목록을 가져오는 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
