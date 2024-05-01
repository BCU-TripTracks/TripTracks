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
      `SELECT toUser_ID, fromUser_ID FROM Follow WHERE toUser_ID = ? OR fromUser_ID = ?`,
      [User_ID, User_ID]
    );
    if (result.length === 0) return res.json({ success: false, msg: "팔로우 및 팔로워 정보가 없습니다." });
    const userInfoMap = { follower: [], following: [] };
    for (const row of result) {
      if (row.fromUser === User_ID) {
        await conn
          .query(`SELECT User_ID, User_Name, Profile_Img FROM User_Info WHERE User_ID = ?`, [row.toUser])
          .then(async (result) => {
            await userInfoMap.follower.push(result[0]);
          });
      } else if (row.toUser === User_ID) {
        await conn
          .query(`SELECT User_ID, User_Name, Profile_Img FROM User_Info WHERE User_ID = ?`, [row.fromUser])
          .then(async (result) => {
            await userInfoMap.following.push(result[0]);
          });
      }
    }
    console.log(userInfoMap);
    return res.json({ success: true, userInfoMap });
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
