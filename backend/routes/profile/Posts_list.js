/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.16.
 * 코드 설명:
 * 최신 게시물 20개와 이미지 경로 및 프로필 이미지 경로를 함께 가져오는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// 최신 게시물 20개와 이미지 경로 및 프로필 이미지 경로를 함께 가져오는 API
router.post("/", async (req, res) => {
  const User_ID = req.body.User_ID;
  console.log(User_ID);
  let conn;
  try {
    conn = await DBconn.getConnection();

    // 최신 게시물 20개와 이미지 경로 및 프로필 이미지 경로를 함께 선택하여 가져옴
    const selectPostsQuery = `
      SELECT Post.Post_ID, Post_Image.Image_Src, Post.User_ID 
      FROM Post 
      LEFT JOIN Post_Image ON Post.Post_ID = Post_Image.Post_ID 
      LEFT JOIN User_Info ON Post.User_ID = User_Info.User_ID
      WHERE User_Info.User_ID = ?
      ORDER BY Post.Post_ID DESC 
      LIMIT 20
    `;
    const posts = await conn.query(selectPostsQuery, [User_ID]);
    for (let item of posts) {
      if (item.User_Rule === 1) {
        await conn.query(
          `INSERT INTO Ambass_Info_Log (User_ID, Year, Month) 
          VALUES (?, YEAR(NOW()), MONTH(NOW())) 
          ON DUPLICATE KEY UPDATE 
            View = View + 1;`,
          [item.User_ID]
        );
        // Post_Log 테이블에 일간 View 증가 기록
        await conn.query(
          `INSERT INTO Post_Log (Post_ID, Log_Date, User_ID, View)
          VALUES (?, CURDATE(), ?, 1)
          ON DUPLICATE KEY UPDATE View = View + 1;`,
          [item.Post_ID, item.User_ID]
        );
      }
      item.Image_Src = "http://triptracks.co.kr/imgserver/" + item.Image_Src;
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
