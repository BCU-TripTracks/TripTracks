/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.03.12.
 * 코드 설명:
 * 팔로워와 팔로잉 목록 출력을 위한 API 스크립트
 */

const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 유저의 팔로워와 팔로잉 목록을 가져오는 API
router.get("/", async (req, res, next) => {
  const { User_ID } = req.session;

  let conn;
  try {
    conn = await DBconn.getConnection();

    const followingsResult = await conn.query(
      `
      SELECT F.fromUser_ID User_ID, UI.Profile_Img
      FROM Follow F
      JOIN User_Info UI ON F.fromUser_ID = UI.User_ID
      WHERE F.toUser_ID = ?;
      `,
      [User_ID]
    );
    const followersResult = await conn.query(
      `
      SELECT F.toUser_ID User_ID, UI.Profile_Img
      FROM Follow F
      JOIN User_Info UI ON F.toUser_ID = UI.User_ID
      WHERE F.fromUser_ID = ?;
      `,
      [User_ID]
    );
    for (let follower of followersResult) {
      follower.Profile_Img = "http://triptracks.co.kr/imgserver/" + follower.Profile_Img;
    }
    for (let following of followingsResult) {
      following.Profile_Img = "http://triptracks.co.kr/imgserver/" + following.Profile_Img;
    }

    return res.json({ followersResult, followingsResult });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "팔로워와 팔로잉 목록을 가져오는 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
