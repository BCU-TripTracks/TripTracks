/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.06.08.
 * 코드 설명:
 * 사용자가 게시물 댓글 작성 시 저장하도록 하는 API 스크립트
 */
var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// 댓글 저장 API
router.post("/", async (req, res) => {
  const user_Id = req.session.User_ID;
  const { postId, comment } = req.body; // 게시글 ID와 댓글 추출
  console.log(req.body);

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 댓글 정보 데이터베이스에 저장
    const insertCommentQuery = "INSERT INTO Post_Comments (Post_ID, User_ID, Comment_Text) VALUES (?, ?, ?)";
    await conn.query(insertCommentQuery, [postId, user_Id, comment]);

    return res.status(200).json({ message: "댓글이 성공적으로 저장되었습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;