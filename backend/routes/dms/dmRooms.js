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
    const result = await conn.query(
      `SELECT DM_Room_ID, toUser_ID, fromUser_ID FROM DM_Rooms WHERE toUser_ID = ? OR fromUser_ID = ?`,
      [User_ID, User_ID]
    );
    if (result.length === 0) return res.json({ success: false, msg: "정보가 없습니다." });

    const Rooms = [];
    for (const row of result) {
      var target_User_ID;
      if (row.toUser_ID === User_ID) target_User_ID = row.fromUser_ID;
      else target_User_ID = row.toUser_ID;
      await conn
        .query(`SELECT User_ID, User_Name, Profile_Img FROM User_Info WHERE User_ID = ?`, [target_User_ID])
        .then(async (result) => {
          await Rooms.push({ Target_User: result[0], DM_Room_ID: row.DM_Room_ID });
        });
    }

    return await res.json({ success: true, Rooms });
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
