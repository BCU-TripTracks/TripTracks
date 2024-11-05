/**
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.10.16.
 * 코드 설명:
 * Ambass_Save 테이블에 저장된 게시물 중 최신 게시물 20개와 이미지 경로 및 프로필 이미지 경로를 가져오는 API 스크립트
 */
var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// Ambass_Save 테이블에 저장된 최신 게시물 20개와 이미지 경로 및 프로필 이미지 경로를 가져오는 API
router.post("/", async (req, res) => {
  const { User_ID } = req.session; // 사용자 ID 추출

  let conn;
  try {
    conn = await DBconn.getConnection();

    // Ambass_Save 테이블에서 엠버서더가 저장한 최신 게시물 20개 가져오기
    const selectAmbassPostsQuery = `
      SELECT 
        CAST(Post.Post_ID AS CHAR) AS Post_ID, 
        Post.Post_Title, 
        Post.Post_Caption, 
        MIN(Post_Image.Image_Src) AS Image_Src, -- 하나의 이미지 경로만 선택
        CAST(Post.User_ID AS CHAR) AS User_ID, 
        User_Info.Profile_Img, 
        User_Info.User_Rule,
        IFNULL(CAST(Post_Like.likeCount AS CHAR), '0') AS likeCount,
        IF(Post_Like_User.User_ID IS NOT NULL, 1, 0) AS isLike
      FROM Ambass_Save 
      LEFT JOIN Post ON Ambass_Save.Post_ID = Post.Post_ID 
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
      WHERE Ambass_Save.User_ID = ? -- Ambass_Save에서 저장한 사용자 ID 필터링
      AND User_Info.User_Rule = 1 -- 엠버서더 사용자만 필터링
      GROUP BY Post.Post_ID -- 각 Post_ID에 대해 중복을 제거
      ORDER BY Post.Post_ID DESC 
      LIMIT 20
    `;
    const posts = await conn.query(selectAmbassPostsQuery, [User_ID, User_ID]);

    // 이미지 경로 수정 및 로그 기록
    for (let item of posts) {
      // 이미지 경로와 프로필 이미지 경로를 서버 URL로 변경
      item.Profile_Img =
        "http://triptracks.co.kr/imgserver/" + item.Profile_Img;
      item.Image_Src = "http://triptracks.co.kr/imgserver/" + item.Image_Src;

      // Ambass_Info_Log에 뷰 카운트 증가
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

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end(); // 연결 종료
  }
});

module.exports = router;
