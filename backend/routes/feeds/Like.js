/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.06.08.
 * 코드 설명:
 * 사용자가 게시물에 좋아요를 추가 및 삭제하도록 하는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// 게시물에 좋아요 추가 API
router.post("/add", async (req, res) => {
  const user_Id = req.session.User_ID;
  const { postId } = req.body; // 게시글 ID 추출
  console.log(req.body);

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 좋아요 정보 데이터베이스에 저장
    const insertLikeQuery = "INSERT INTO Post_Likes (Post_ID, User_ID) VALUES (?, ?)";
    await conn.query(insertLikeQuery, [postId, user_Id]);

    return res.status(200).json({ message: "게시물에 좋아요를 성공적으로 추가했습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

// 게시물에 좋아요 삭제 API
router.post("/remove", async (req, res) => {
  const user_Id = req.session.User_ID;
  const { postId } = req.body; // 게시글 ID 추출
  console.log(req.body);

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 좋아요 정보 데이터베이스에서 삭제
    const deleteLikeQuery = "DELETE FROM Post_Like WHERE Post_ID = ? AND Liker_ID = ?";
    await conn.query(deleteLikeQuery, [postId, user_Id]);

    return res.status(200).json({ message: "게시물에서 좋아요를 성공적으로 제거했습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

// 게시물의 좋아요 수 조회 API
router.get("/count/:postId", async (req, res) => {
  const postId = req.params.postId; // 게시글 ID 추출
  console.log(req.params);

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 좋아요 수 조회
    const countLikesQuery = "SELECT COUNT(*) AS likeCount FROM Post_Likes WHERE Post_ID = ?";
    const [rows] = await conn.query(countLikesQuery, [postId]);

    const likeCount = rows[0].likeCount;
    console.log(`Post ID: ${postId}, Like Count: ${likeCount}`);

    return res.status(200).json({ postId, likeCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;