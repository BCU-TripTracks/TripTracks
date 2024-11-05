/**
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.10.16.
 * 코드 설명:
 * 사용자가 게시물을 다시 보기 위해 저장하거나 삭제하는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// 게시글 저장 API
router.post("/add", async (req, res) => {
  const { postId } = req.body; // 저장할 게시물의 ID
  const userId = req.session.User_ID; // 저장하는 사용자의 세션 정보

  let conn;
  try {
    conn = await DBconn.getConnection();
    await conn.beginTransaction(); // 트랜잭션 시작

    // 게시글 작성자의 User_Rule 확인
    const selectPostAuthorQuery = `
      SELECT UI.User_Rule 
      FROM Post P 
      JOIN User_Info UI ON P.User_ID = UI.User_ID 
      WHERE P.Post_ID = ?
    `;
    const authorResult = await conn.query(selectPostAuthorQuery, [postId]);

    if (authorResult.length === 0) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }

    const authorUserRule = authorResult[0].User_Rule;

    // 게시글 작성자의 User_Rule에 따라 다른 테이블에 게시물 저장
    if (authorUserRule === 0) {
      // 게시글 작성자가 일반 사용자일 경우 Post_Save 테이블에 저장
      const insertPostSaveQuery =
        "INSERT INTO Post_Save (User_ID, Post_ID) VALUES (?, ?)";
      await conn.query(insertPostSaveQuery, [userId, postId]);
    } else if (authorUserRule === 1) {
      // 게시글 작성자가 홍보대사(Ambass)일 경우 Ambass_Save 테이블에 저장
      const insertAmbassSaveQuery =
        "INSERT INTO Ambass_Save (User_ID, Post_ID) VALUES (?, ?)";
      await conn.query(insertAmbassSaveQuery, [userId, postId]);
    } else {
      return res
        .status(400)
        .json({ error: "잘못된 게시글 작성자 유형입니다." });
    }

    await conn.commit(); // 트랜잭션 커밋
    return res
      .status(200)
      .json({ message: "게시물이 성공적으로 저장되었습니다." });
  } catch (error) {
    console.error(error);
    if (conn) await conn.rollback(); // 오류 발생 시 트랜잭션 롤백
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end(); // 연결 종료
  }
});

// 게시글 저장 삭제 API
router.post("/delete", async (req, res) => {
  const { postId } = req.body; // 삭제할 게시물의 ID
  const userId = req.session.User_ID; // 삭제 요청을 한 사용자의 세션 정보

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 게시글 작성자의 User_Rule 확인
    const selectPostAuthorQuery = `
      SELECT UI.User_Rule 
      FROM Post P 
      JOIN User_Info UI ON P.User_ID = UI.User_ID 
      WHERE P.Post_ID = ?
    `;
    const authorResult = await conn.query(selectPostAuthorQuery, [postId]);

    if (authorResult.length === 0) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }

    const authorUserRule = authorResult[0].User_Rule;

    // 게시글 작성자의 User_Rule에 따라 다른 테이블에서 게시물 삭제
    if (authorUserRule === 0) {
      // 게시글 작성자가 일반 사용자일 경우 Post_Save 테이블에서 삭제
      const deletePostSaveQuery =
        "DELETE FROM Post_Save WHERE User_ID = ? AND Post_ID = ?";
      await conn.query(deletePostSaveQuery, [userId, postId]);
    } else if (authorUserRule === 1) {
      // 게시글 작성자가 홍보대사(Ambass)일 경우 Ambass_Save 테이블에서 삭제
      const deleteAmbassSaveQuery =
        "DELETE FROM Ambass_Save WHERE User_ID = ? AND Post_ID = ?";
      await conn.query(deleteAmbassSaveQuery, [userId, postId]);
    } else {
      return res
        .status(400)
        .json({ error: "잘못된 게시글 작성자 유형입니다." });
    }

    return res
      .status(200)
      .json({ message: "저장된 게시물이 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end(); // 연결 종료
  }
});

module.exports = router;
