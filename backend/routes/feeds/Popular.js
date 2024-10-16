const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// BigInt를 문자열로 변환해주는 함수
const convertBigIntToString = (obj) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

router.get("/", async (req, res) => {
  let conn;
  try {
    conn = await DBconn.getConnection(); // DB 커넥션 얻기

    // 게시물, 전체 좋아요 수, 전체 댓글 수 등을 가져오는 쿼리
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
        (COUNT(DISTINCT Post_Like.User_ID) + (COUNT(DISTINCT Post_Comments.Comment_ID)) * 3) AS totalEngagement
      FROM Post 
      LEFT JOIN Post_Image ON Post.Post_ID = Post_Image.Post_ID 
      LEFT JOIN User_Info ON Post.User_ID = User_Info.User_ID 
      LEFT JOIN Post_Like ON Post.Post_ID = Post_Like.Post_ID  -- 좋아요 테이블 조인
      LEFT JOIN Post_Comments ON Post.Post_ID = Post_Comments.Post_ID  -- 댓글 테이블 조인
      GROUP BY Post.Post_ID  -- Post_ID로 그룹화
      ORDER BY totalEngagement DESC, Post.Post_ID DESC 
      LIMIT 20;
    `;

    // 전체 사용자의 게시물 기준으로 쿼리 실행
    const posts = await conn.query(selectPostsQuery);

    // 쿼리 결과에서 BigInt를 문자열로 변환
    const convertedPosts = convertBigIntToString(posts);

    // 프로필 이미지 경로와 게시물 이미지 경로 처리
    for (let item of convertedPosts) {
      if (item.User_Rule === 1) {
        // User_Rule이 1인 경우 Ambassador 정보 로그 업데이트
        await conn.query(
          `INSERT INTO Ambass_Info_Log (User_ID, Year, Month) 
          VALUES (?, YEAR(NOW()), MONTH(NOW())) 
          ON DUPLICATE KEY UPDATE 
            View = View + 1;`,
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
    console.error(error); // 오류 로그
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end(); // DB 커넥션 해제
  }
});

module.exports = router;
