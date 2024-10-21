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
  const User_ID = req.session.User_ID;
  const { Target_User, Message, type } = req.body;
  console.log(User_ID, Target_User, Message, type);
  let conn;
  try {
    conn = await db.getConnection();
    const [Room] = await db.query(
      `
      SELECT Room_ID
      FROM DM_Member
      WHERE User_ID = ? OR User_ID = ?
      GROUP BY Room_ID
      HAVING COUNT(*) = 2;
      `,
      [User_ID, Target_User]
    );
    if (!Room) {
      const CreateDMRoom = await db.query(`INSERT INFO DM_Room`);
      const DMRoom_ID = CreateDMRoom.insertId;
      await db.query(`INSERT INTO DM_Member (Room_ID, User_ID) VALUES (?, ?)`, [DMRoom_ID, User_ID]);
      await db.query(`INSERT INTO DM_Member (Room_ID, User_ID) VALUES (?, ?)`, [DMRoom_ID, Target_User]);
      await db.query(`INSERT INTO DM_Message (Room_ID, Sender_ID, Content, type) VALUES (?, ?, ?, ?)`, [
        DMRoom_ID,
        User_ID,
        Message,
        type,
      ]);
      res.json({ Room_ID: DMRoom_ID });
    } else {
      await db.query(`INSERT INTO DM_Message (Room_ID, Sender_ID, Content, type) VALUES (?, ?, ?, ?)`, [
        Room.Room_ID,
        User_ID,
        Message,
        type,
      ]);
      res.json({ Room_ID: Room.Room_ID });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "사용자가 속한 방 목록을 가져오는 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
