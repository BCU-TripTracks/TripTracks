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

router.post("/add", async (req, res) => {
  const User_ID = req.session.User_ID;
  const { Post_ID, Comment } = req.body; // 게시글 ID와 댓글 추출

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 댓글 정보 데이터베이스에 저장
    const insertCommentQuery = "INSERT INTO Post_Comments (Post_ID, User_ID, Comment_Text) VALUES (?, ?, ?)";
    await conn.query(insertCommentQuery, [Post_ID, User_ID, Comment]);
    const [Post_User] = await conn.query(
      `
      SELECT u.User_Rule, p.User_ID
      FROM Post p
      JOIN User_Info u ON p.User_ID = u.User_ID
      WHERE p.Post_ID = ?
    `,
      [Post_ID]
    );

    if (Post_User.User_Rule === 1) {
      await conn.query(
        `INSERT INTO Ambass_Info_Log (User_ID, Year, Month) 
        VALUES (?, YEAR(NOW()), MONTH(NOW())) 
        ON DUPLICATE KEY UPDATE 
          Comment = Comment + 1;`,
        [Post_User.User_ID]
      );
      // Post_Log 테이블에 일간 Comment 증가 기록
      await conn.query(
        `INSERT INTO Post_Log (Post_ID, Log_Date, User_ID, Comment)
  VALUES (?, CURDATE(), ?, 1)
  ON DUPLICATE KEY UPDATE Comment = Comment + 1;`,
        [Post_ID, Post_User.User_ID]
      );
    }
    return res.status(200).json({ message: "댓글이 성공적으로 저장되었습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

router.post("/list", async (req, res) => {
  const { Post_ID } = req.body; // 게시글 ID 추출

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 댓글 정보 데이터베이스에서 가져오기
    const selectCommentQuery = `
      SELECT 
        Post_Comments.Comment_ID, 
        Post_Comments.User_ID, 
        Post_Comments.Comment_Text, 
        Post_Comments.Comment_Timestamp, 
        User_Info.Profile_Img,
        User_Info.User_Name
      FROM Post_Comments
      LEFT JOIN User_Info ON Post_Comments.User_ID = User_Info.User_ID
      WHERE Post_Comments.Post_ID = ?
      ORDER BY Post_Comments.Comment_Timestamp DESC;
    `;
    const comments = await conn.query(selectCommentQuery, [Post_ID]);

    for (let item of comments) {
      item.Profile_Img = "http://triptracks.co.kr/imgserver/" + item.Profile_Img;
    }
    console.log(comments);
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

router.post("/delete", async (req, res) => {
  const User_ID = req.session.User_ID;
  const { Post_ID, Comment_ID } = req.body; // 게시글 ID와 댓글 추출

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 댓글 정보 데이터베이스에서 삭제
    const deleteCommentQuery = "DELETE FROM Post_Comments WHERE Comment_ID = ?";
    await conn.query(deleteCommentQuery, [Comment_ID]);
    const [Post_User] = await conn.query(
      `
      SELECT u.User_Rule, p.User_ID
      FROM Post p
      JOIN User_Info u ON p.User_ID = u.User_ID
      WHERE p.Post_ID = ?
    `,
      [Post_ID]
    );

    if (Post_User.User_Rule === 1) {
      await conn.query(
        `INSERT INTO Ambass_Info_Log (User_ID, Year, Month) 
        VALUES (?, YEAR(NOW()), MONTH(NOW())) 
        ON DUPLICATE KEY UPDATE 
          Comment = Comment - 1;`,
        [Post_User.User_ID]
      );
      // Post_Log 테이블에 일간 Comment 증감 기록
      await conn.query(
        `INSERT INTO Post_Log (Post_ID, Log_Date, User_ID, Comment)
  VALUES (?, CURDATE(), ?, 1)
  ON DUPLICATE KEY UPDATE Comment = Comment - 1;`,
        [Post_ID, Post_User.User_ID]
      );
    }
    return res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
