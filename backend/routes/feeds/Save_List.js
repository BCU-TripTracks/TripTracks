/**
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.10.16.
 * 코드 설명:
 * 사용자가 저장한 게시물 중 최신 게시물 20개와 이미지 경로 및 프로필 이미지 경로를 가져오는 API 스크립트
 */
var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// 사용자가 저장한 최신 게시물 20개와 이미지 경로 및 프로필 이미지 경로를 함께 가져오는 API
router.post("/", async (req, res) => {
  const { User_ID } = req.session; // 세션에서 사용자 ID 추출

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 사용자가 저장한 게시물 중 최신 20개 가져오기
    const selectSavedPostsQuery = `
      SELECT 
        CAST(Post.Post_ID AS CHAR) AS Post_ID, 
        Post.Post_Title, 
        Post.Post_Caption, 
        MIN(Post_Image.Image_Src) AS Image_Src, -- 게시물의 대표 이미지
        CAST(Post.User_ID AS CHAR) AS User_ID, 
        User_Info.Profile_Img, 
        User_Info.User_Rule,
        IFNULL(CAST(Post_Like.likeCount AS CHAR), '0') AS likeCount,
        IF(Post_Like_User.User_ID IS NOT NULL, 1, 0) AS isLike
      FROM Post_Save 
      LEFT JOIN Post ON Post_Save.Post_ID = Post.Post_ID
      LEFT JOIN Post_Image ON Post.Post_ID = Post_Image.Post_ID 
      LEFT JOIN User_Info ON Post.User_ID = User_Info.User_ID
      LEFT JOIN (
        SELECT Post_ID, COUNT(*) AS likeCount 
        FROM Post_Like 
        GROUP BY Post_ID
      ) AS Post_Like ON Post.Post_ID = Post_Like.Post_ID
      LEFT JOIN (
        SELECT Post_ID, User_ID
        FROM Post_Like
        WHERE User_ID = ?
      ) AS Post_Like_User ON Post.Post_ID = Post_Like_User.Post_ID
      WHERE Post_Save.User_ID = ? -- 사용자가 저장한 게시물만 필터링
      GROUP BY Post.Post_ID -- 각 게시물마다 중복을 제거
      ORDER BY Post_Save.Save_Date DESC 
      LIMIT 20
    `;

    // 쿼리 실행: User_ID를 필터링
    const posts = await conn.query(selectSavedPostsQuery, [User_ID, User_ID]);

    // 각 게시물에 대해 추가 작업 수행
    for (let item of posts) {
      if (item.User_Rule === 1) {
        // Ambass_Info_Log 및 Post_Log 테이블에 로그 기록
        await conn.query(
          `INSERT INTO Ambass_Info_Log (User_ID, Year, Month) 
          VALUES (?, YEAR(NOW()), MONTH(NOW())) 
          ON DUPLICATE KEY UPDATE 
            View = View + 1;`,
          [item.User_ID]
        );
        await conn.query(
          `INSERT INTO Post_Log (Post_ID, Log_Date, User_ID, View)
          VALUES (?, CURDATE(), ?, 1)
          ON DUPLICATE KEY UPDATE View = View + 1;`,
          [item.Post_ID, item.User_ID]
        );
      }

      // 이미지 경로를 절대 경로로 변환
      item.Profile_Img =
        "http://triptracks.co.kr/imgserver/" + item.Profile_Img;
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
