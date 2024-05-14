/***
 * 코드 최초 작성자 : 이영재
 * 코드 최초 작성일 : 2024.05.14.
 * 코드 설명:
 * 프로필 정보 및 프로필 이미지를 업데이트하는 API 스크립트
 */

const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 프로필 정보를 로드해서 보내줌
router.get("/", async (req, res, next) => {
  const User_ID = req.session.User_ID; // 수정할 유저의 아이디
  if (!User_ID) return res.status(401).json({ errCode: "NotLogin", message: "로그인이 필요합니다." });

  let conn;
  try {
    conn = await DBconn.getConnection();

    const [userInfo] = await conn.query(
      `SELECT User_ID, User_Name, User_Email, Profile_Img, User_Msg FROM User_Info WHERE User_ID = ?`,
      [User_ID]
    );
    if (!userInfo) return res.status(404).json({ message: "해당 사용자를 찾을 수 없습니다." });
    const userTag = await conn.query(`SELECT User_Tag FROM User_Tags WHERE User_ID = ?`, [User_ID]);
    userInfo.User_Tag = userTag.map((tag) => tag.User_Tag);
    userInfo.Profile_Img = "http://triptracks.co.kr/imgserver/" + userInfo.Profile_Img;

    console.log(userInfo);
    return res.json(userInfo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "프로필 정보를 불러오는 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
