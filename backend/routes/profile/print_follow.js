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
  const user_Email = req.query.user_Email;

  let conn;
  try {
    conn = await DBconn.getConnection();
    
    const [followersResult] = await conn.query("SELECT fromUser FROM Follow WHERE toUser = ?", [user_Email]); 
    const [followingsResult] = await conn.query("SELECT toUser FROM Follow WHERE fromUser = ?", [user_Email]); 

    // 팔로워와 팔로잉 목록을 정수형으로 변환
    const followers = parseInt(followersResult.fromUser)+1;
    const followings = parseInt(followingsResult.toUser)+1;
    console.log(followers,followings);
    return res.json({ followers, followings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '팔로워와 팔로잉 목록을 가져오는 중 오류가 발생했습니다.' });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;