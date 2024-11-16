const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// BigInt를 문자열로 변환하는 함수
const convertBigIntToString = (obj) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

// 게시물 조회 API (isLike 및 isSave 포함)
router.get("/", async (req, res) => {
  const { User_ID } = req.session; // 세션에서 사용자 ID 가져오기

  let conn;
  try {
    conn = await DBconn.getConnection(); // DB 커넥션 얻기

    // 게시물 정보, 좋아요 수, 댓글 수, isLike 및 isSave 정보를 포함한 쿼리
    const selectPostsQuery = `
      SELECT 
        CAST(Post.Post_ID AS CHAR) AS Post_ID, 
        Post.Post_Title, 
        Post.Post_Caption, 
        MIN(Post_Image.Image_Src) AS Image_Src, 
        CAST(Post.User_ID AS CHAR) AS User_ID, 
        User_Info.Profile_Img, 
        User_Info.User_Rule,
        COUNT(DISTINCT Post_Like.User_ID) AS likeCount,  -- 전체 좋아요 수 계산
        COUNT(DISTINCT Post_Comments.Comment_ID) AS commentCount,  -- 전체 댓글 수 계산
        (COUNT(DISTINCT Post_Like.User_ID) + (COUNT(DISTINCT Post_Comments.Comment_ID)) * 3) AS totalEngagement,
        IF(Post_Like_User.User_ID IS NOT NULL, 1, 0) AS isLike, -- 사용자의 좋아요 여부
        IF(
          (User_Info.User_Rule = 1 AND Ambass_Save_User.User_ID IS NOT NULL) OR 
          (User_Info.User_Rule = 0 AND Post_Save_User.User_ID IS NOT NULL), 
          1, 0
        ) AS isSave -- 사용자의 저장 여부
      FROM Post
      LEFT JOIN Post_Image ON Post.Post_ID = Post_Image.Post_ID 
      LEFT JOIN User_Info ON Post.User_ID = User_Info.User_ID 
      LEFT JOIN Post_Like ON Post.Post_ID = Post_Like.Post_ID 
      LEFT JOIN Post_Comments ON Post.Post_ID = Post_Comments.Post_ID 
      LEFT JOIN (
        SELECT Post_ID, User_ID
        FROM Post_Like
        WHERE User_ID = ?
      ) AS Post_Like_User ON Post.Post_ID = Post_Like_User.Post_ID
      LEFT JOIN (
        SELECT Post_ID, User_ID
        FROM Post_Save
        WHERE User_ID = ?
      ) AS Post_Save_User ON Post.Post_ID = Post_Save_User.Post_ID
      LEFT JOIN (
        SELECT Post_ID, User_ID
        FROM Ambass_Save
        WHERE User_ID = ?
      ) AS Ambass_Save_User ON Post.Post_ID = Ambass_Save_User.Post_ID
      GROUP BY Post.Post_ID
      ORDER BY totalEngagement DESC, Post.Post_ID DESC 
      LIMIT 20;
    `;

    // 쿼리 실행 (isLike, isSave, 전체 좋아요 및 댓글 수 포함)
    const posts = await conn.query(selectPostsQuery, [
      User_ID,
      User_ID,
      User_ID,
    ]);

    // 쿼리 결과에서 BigInt를 문자열로 변환
    const convertedPosts = convertBigIntToString(posts);

    // 프로필 이미지 경로 및 게시물 이미지 경로 처리
    for (let item of convertedPosts) {
      if (item.User_Rule === 1) {
        // User_Rule이 1인 경우 Ambassador 정보 로그 업데이트
        await conn.query(
          `INSERT INTO Ambass_Info_Log (User_ID, Year, Month) 
          VALUES (?, YEAR(NOW()), MONTH(NOW())) 
          ON DUPLICATE KEY UPDATE View = View + 1;`,
          [item.User_ID]
        );
      }

      // Post_Log 테이블에 일간 View 증가 기록
      await conn.query(
        `INSERT INTO Post_Log (Post_ID, Log_Date, User_ID, View)
        VALUES (?, CURDATE(), ?, 1)
        ON DUPLICATE KEY UPDATE View = View + 1;`,
        [item.Post_ID, item.User_ID]
      );

      // 이미지 경로 조합
      item.Profile_Img =
        "http://triptracks.co.kr/imgserver/" + item.Profile_Img;
      item.Image_Src = "http://triptracks.co.kr/imgserver/" + item.Image_Src;
    }

    return res.status(200).json(convertedPosts); // 최종 결과 응답
  } catch (error) {
    console.error(error); // 오류 로그 출력
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end(); // DB 커넥션 해제
  }
});

module.exports = router;
