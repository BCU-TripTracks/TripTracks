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
router.get("/", async (req, res) => {
  const User_ID = req.session.User_ID;

  let conn;
  try {
    conn = await DBconn.getConnection();
    const result = await conn.query(`SELECT Room_ID, User_ID FROM DM_Member WHERE User_ID = ?`, [User_ID]);
    if (result.length === 0) return res.json({ success: false, msg: "정보가 없습니다." });

    const Rooms = [];
    for (const row of result) {
      const find_Target = await conn.query(`SELECT * FROM DM_Member WHERE Room_ID = ? AND NOT(User_ID = ?)`, [
        row.Room_ID,
        User_ID,
      ]);
      await Rooms.push({ RoomID: row.Room_ID, Target_User: find_Target[0].User_ID });
    }

    return await res.json({ success: true, Rooms });
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
