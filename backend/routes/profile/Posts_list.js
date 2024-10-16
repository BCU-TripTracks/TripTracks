/**
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
      SELECT 
        Post.Post_ID, 
        MIN(Post_Image.Image_Src) AS Image_Src, -- 각 Post_ID당 하나의 이미지 선택
        Post.User_ID, 
        User_Info.Profile_Img,
        User_Info.User_Rule
      FROM Post 
      LEFT JOIN Post_Image ON Post.Post_ID = Post_Image.Post_ID 
      LEFT JOIN User_Info ON Post.User_ID = User_Info.User_ID
      WHERE User_Info.User_ID = ? -- 특정 사용자에 대한 필터링
      GROUP BY Post.Post_ID -- 각 Post_ID에 대해 중복 제거
      ORDER BY Post.Post_ID DESC 
      LIMIT 20
    `;

    const posts = await conn.query(selectPostsQuery, [User_ID]);

    for (let item of posts) {
      // User_Rule이 1인 경우 로그 기록
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

      // 이미지 경로를 절대 경로로 변환
      item.Image_Src = "http://triptracks.co.kr/imgserver/" + item.Image_Src;
    }

    return res.status(200).json(posts); // JSON 형식으로 게시물 반환
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end(); // DB 연결 종료
  }
});

module.exports = router;
