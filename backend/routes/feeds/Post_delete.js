/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.05.13.
 * 코드 설명:
 * 사용자가 게시물을 삭제하는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// 게시물 삭제 엔드포인트
router.get("/", async (req, res) => {
  const postId = req.params.Post_ID;

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 게시물 삭제
    const deletePostQuery = "DELETE FROM Post_Image, Post WHERE Post_ID = ?";
    await conn.query(deletePostQuery, [postId]);

    return res.status(200).json({ message: "게시물이 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "게시물 삭제 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;