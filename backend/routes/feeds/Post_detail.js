/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.16.
 * 코드 설명:
 * 게시물 출력과 팔로우 정보를 받아오는 API 스크립트
 */


const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 게시물 및 팔로우 정보를 함께 가져오는 API
router.get("/", async (req, res) => {
  const postId = req.params.postId;
  const user_ID = req.session.User_ID;

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 게시물 정보 가져오기
    const selectPostQuery = `
      SELECT Post.Post_ID, Post.User_ID, Post.Post_Caption, Post.Post_Like, Post.Post_Create_Timestamp, Post.Post_Title, Post_Image.Image_Src 
      FROM Post 
      LEFT JOIN Post_Image ON Post.Post_ID = Post_Image.Post_ID 
      WHERE Post.Post_ID = ?;
    `;
    const postResult = await conn.query(selectPostQuery, [postId]);
    const post = postResult[0];

    // 팔로우 정보 가져오기
    const selectFollowQuery = `
      SELECT * FROM Follow 
      WHERE toUser_ID = ? AND fromUser_ID = ?;
    `;
    const followResult = await conn.query(selectFollowQuery, [post.User_ID, user_ID]);
    const isFollowing = followResult.length > 0;

    // 팔로우 정보 확인하여 결과 반환
    const isFollowedByCurrentUser = post.User_ID === user_ID || isFollowing;

    return res.status(200).json({ post, isFollowedByCurrentUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;