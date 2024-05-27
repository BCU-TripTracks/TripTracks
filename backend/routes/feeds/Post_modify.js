/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.16.
 * 코드 설명:
 * 사용자가 게시물 업로드 시 저장하도록 하는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// 게시물 수정
router.post("/", async (req, res) => {
  const { postId, tag, comment, Title } = req.body;
  const userId = req.session.User_ID;

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 게시글이 사용자의 게시글인지 확인
    const checkPostQuery = "SELECT User_ID FROM Post WHERE Post_ID = ?";
    const checkPostResult = await conn.query(checkPostQuery, [postId]);

    if (checkPostResult.length === 0 || checkPostResult[0].User_ID !== userId) {
      return res.status(403).json({ error: "게시글을 수정할 권한이 없습니다." });
    }

    // 게시물 정보 수정
    const updatePostQuery = "UPDATE Post SET Post_Caption = ?, Post_Title = ? WHERE Post_ID = ?";
    await conn.query(updatePostQuery, [comment, Title, postId]);

    // 태그 정보 삭제 및 재삽입
    const deleteTagListQuery = "DELETE FROM Tag_List WHERE Post_ID = ?";
    await conn.query(deleteTagListQuery, [postId]);

    if (tag && tag.length > 0) {
      for (const item of tag) {
        await conn.query(
          `
          INSERT INTO Tags_Info (Tag) VALUES (?) 
          ON DUPLICATE KEY UPDATE Tag = VALUES(Tag);
          `,
          [item]
        );
        const insertTagQuery = "INSERT INTO Tag_List (Post_ID, Post_Tag) VALUES (?, ?)";
        await conn.query(insertTagQuery, [postId, item]);
      }
    }

    return res.status(200).json({ message: "게시물이 성공적으로 수정되었습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;