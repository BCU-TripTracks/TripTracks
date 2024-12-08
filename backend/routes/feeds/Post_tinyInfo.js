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
  const { User_ID } = req.session; // 사용자 ID 추출
  const { Post_ID } = req.body;

  let conn;
  try {
    conn = await DBconn.getConnection();

    // Post 테이블에서 Post_ID를 통해 Post_Image 테이블의 Image_Src를 한장 가져오고 User_Info 테이블의 정보를 가져옴
    const [post] = await conn.query(
      `
      SELECT 
        Post.Post_Caption,
        Post.Post_Title, 
        (SELECT Image_Src 
         FROM Post_Image 
         WHERE Post_Image.Post_ID = Post.Post_ID 
         LIMIT 1) AS Image_Src, 
        User_Info.User_ID,
        User_Info.Profile_Img,
        User_Info.User_Name
      FROM Post
      JOIN User_Info ON Post.User_ID = User_Info.User_ID
      WHERE Post.Post_ID = ?
      `,
      [Post_ID]
    );

    post.Profile_Img = "http://triptracks.co.kr/imgserver/" + post.Profile_Img;
    post.Image_Src = "http://triptracks.co.kr/imgserver/" + post.Image_Src;

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
