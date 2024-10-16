/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.06.08.
 * 코드 설명:
 * 게시물에 대한 댓글을 20개씩 가져오는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// 게시물에 대한 댓글을 20개씩 가져오는 API
router.get("/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { lastCommentId } = req.query; // 마지막 댓글 ID 추출, 없으면 기본값은 0
  const limit = 20;

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 게시물에 대한 댓글 20개를 가져옴
    const selectCommentsQuery = `
      SELECT Post_Comments.Comment_ID, Post_Comments.Comment_Text, Post_Comments.User_ID, User_Info.Profile_Img 
      FROM Comment 
      LEFT JOIN User_Info ON Post_Comments.User_ID = User_Info.User_ID
      WHERE Post_Comments.Post_ID = ? AND Post_Comments.Comment_ID > ?
      ORDER BY Post_Comments.Comment_ID DESC 
      LIMIT ?
    `;
    const [comments] = await conn.query(selectCommentsQuery, [
      postId,
      lastCommentId || 0,
      limit,
    ]);

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
