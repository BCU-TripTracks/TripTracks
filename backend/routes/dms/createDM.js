/***
 * 코드 최초 작성자: 이영재
 * 코드 최초 작성일: 2024.04.30.
 * 코드 설명:
 * 팔로워 및 팔로잉 정보를 전달하기 위한 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// 이미지 경로를 클라이언트로 전송
router.post("/", async (req, res) => {
  const User_ID = req.session.User_ID;
  const { targetID } = req.body;

  let conn;
  try {
    conn = await DBconn.getConnection();
    const result = await conn.query(
      `SELECT dm.Room_ID
      FROM DM_Member dm
      WHERE dm.User_ID IN (?, ?)
      GROUP BY dm.Room_ID
      HAVING COUNT(DISTINCT dm.User_ID) = ?
        AND COUNT(*) = ?
      `,
      [User_ID, targetID, 2, 2]
    );
    if (result.length === 0) {
      const [roomResult] = await conn.query(`INSERT INTO DM_Room () VALUES ()`);
      const roomID = roomResult.insertId;
      await conn.query(`INSERT INTO DM_Member (Room_ID, User_ID) VALUES (?, ?), (?, ?)`, [
        roomID,
        User_ID,
        roomID,
        targetID,
      ]);
      return res.json({ success: true, roomID });
    }

    return await res.json({ success: true, Room_ID: result[0].Room_ID });
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
