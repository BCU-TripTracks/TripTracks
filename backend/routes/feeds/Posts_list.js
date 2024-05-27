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
router.get("/", async (req, res) => {
  let conn;
  try {
    conn = await DBconn.getConnection();

    // 최신 게시물 20개와 이미지 경로 및 프로필 이미지 경로를 함께 선택하여 가져옴
    const selectPostsQuery = `
      SELECT Post.Post_ID, Post.Post_Title, Post.Post_Caption, Post_Image.Image_Src, Post.User_ID, User_Info.Profile_Img, User_Info.User_Rule 
      FROM Post 
      LEFT JOIN Post_Image ON Post.Post_ID = Post_Image.Post_ID 
      LEFT JOIN User_Info ON Post.User_ID = User_Info.User_ID
      ORDER BY Post.Post_ID DESC 
      LIMIT 20
    `;
    const posts = await conn.query(selectPostsQuery);
    for (let item of posts) {
      if (item.User_Rule === 1) {
        await conn.query(
          `INSERT INTO Ambass_Info_Log (User_ID, Year, Month) 
          VALUES (?, YEAR(NOW()), MONTH(NOW())) 
          ON DUPLICATE KEY UPDATE 
            View = View + 1;`,
          [item.User_ID]
        );
      }
      item.Profile_Img = "http://triptracks.co.kr/imgserver/" + item.Profile_Img;
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
