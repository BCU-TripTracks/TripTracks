/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.10.6.
 * 코드 설명:
 * 설정한 태그에 가장 부합한 게시물 20개와 이미지 경로 및 프로필 이미지 경로를 가져오는 API 스크립트
 */

const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

router.get("/", async (req, res) => {
  const { User_ID } = req.session; // 사용자 ID 추출

  let conn;
  try {
    conn = await DBconn.getConnection();

    const User_Tags_List = await conn.query(
      `
      SELECT User_Tag
      FROM User_Tags
      WHERE User_ID = ?`,
      [User_ID]
    );

    const Tags = User_Tags_List.map((row) => row.User_Tag);

    return res.status(200).json(Tags);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  }
});

router.post("/searchByTags", async (req, res) => {
  const { User_ID } = req.session; // 세션에서 User_ID를 가져옴
  const { tags } = req.body; // 사용자가 입력한 태그 목록

  if (!tags || tags.length === 0) {
    return res.status(400).json({ error: "태그 목록이 비어 있습니다." });
  }

  let conn;
  try {
    conn = await DBconn.getConnection(); // DB 커넥션 얻기
    const SelectPostsList = await conn.query(
      `
      SELECT DISTINCT Post_ID
      FROM Tag_List
      WHERE Post_Tag IN (${tags.map(() => "?").join(", ")});
      `,
      [...tags, tags.length]
    );

    if (SelectPostsList.length === 0) {
      console.log("조건에 맞는 게시물이 없습니다.");
      return;
    }

    // Post_ID들을 배열로 추출
    const postIds = SelectPostsList.map((row) => row.Post_ID);

    // 여러 Post_ID에 대한 정보를 한 번에 가져오는 쿼리 실행
    const Post_List = await conn.query(
      `
      SELECT 
        User_Info.Profile_Img,
        Post.Post_ID, 
        Post.User_ID, 
        Post.Post_Title, 
        Post.Post_Caption, 
        Post_Image.Image_Src
      FROM Post
      LEFT JOIN User_Info ON Post.User_ID = User_Info.User_ID
      LEFT JOIN Post_Image ON Post.Post_ID = Post_Image.Post_ID
      WHERE Post.Post_ID IN (${postIds.map(() => "?").join(", ")});
      `,
      postIds
    );
    for (let item of Post_List) {
      item.Profile_Img = "http://triptracks.co.kr/imgserver/" + item.Profile_Img;
      item.Image_Src = "http://triptracks.co.kr/imgserver/" + item.Image_Src;
    }

    return res.status(200).json(Post_List); // 최종 결과 응답

    // 사용자가 입력한 태그들이 포함된 게시물들을 태그 포함 수에 따라 내림차순으로 가져오는 쿼리
    // const selectPostsByTagsQuery = `
    //   SELECT
    //     CAST(Post.Post_ID AS CHAR) AS Post_ID,
    //     Post.Post_Title,
    //     Post.Post_Caption,
    //     MIN(Post_Image.Image_Src) AS Image_Src,
    //     CAST(Post.User_ID AS CHAR) AS User_ID,
    //     User_Info.Profile_Img,
    //     User_Info.User_Rule,
    //     COUNT(DISTINCT Post_Like.User_ID) AS likeCount,  -- 좋아요 수 계산
    //     COUNT(DISTINCT Post_Comments.Comment_ID) AS commentCount,  -- 댓글 수 계산
    //     (COUNT(DISTINCT Post_Like.User_ID) + (COUNT(DISTINCT Post_Comments.Comment_ID)) * 3) AS totalEngagement,
    //     IF(Post_Like_User.User_ID IS NOT NULL, 1, 0) AS isLike,
    //     COUNT(DISTINCT Tag_List.Post_Tag) AS tagCount -- 일치하는 태그 수 계산
    //   FROM Post
    //   LEFT JOIN Post_Image ON Post.Post_ID = Post_Image.Post_ID
    //   LEFT JOIN User_Info ON Post.User_ID = User_Info.User_ID
    //   LEFT JOIN Post_Like ON Post.Post_ID = Post_Like.Post_ID -- 좋아요 테이블 조인
    //   LEFT JOIN Post_Comments ON Post.Post_ID = Post_Comments.Post_ID -- 댓글 테이블 조인
    //   LEFT JOIN (
    //     SELECT Post_ID, User_ID
    //     FROM Post_Like
    //     WHERE User_ID = ?
    //   ) AS Post_Like_User ON Post.Post_ID = Post_Like_User.Post_ID
    //   LEFT JOIN Tag_List ON Post.Post_ID = Tag_List.Post_ID -- 태그 테이블 조인
    //   WHERE Tag_List.Post_Tag IN (${tags.map(() => '?').join(', ')}) -- 태그 필터링
    //   GROUP BY Post.Post_ID -- Post_ID로 그룹화
    //   HAVING tagCount > 0 -- 최소 한 개 이상의 태그 일치
    //   ORDER BY tagCount DESC, totalEngagement DESC, Post.Post_ID DESC -- 태그 포함 수에 따른 내림차순 정렬
    //   LIMIT 20;
    // `;

    // // 쿼리 실행: 태그와 사용자 ID를 포함한 배열 전달
    // const posts = await conn.query(selectPostsByTagsQuery, [User_ID, ...tags]);

    // // 쿼리 결과에서 BigInt를 문자열로 변환
    // const convertedPosts = convertBigIntToString(posts);

    // // 프로필 이미지 경로와 게시물 이미지 경로 처리
    // for (let item of convertedPosts) {
    //   if (item.User_Rule === 1) {
    //     // User_Rule이 1인 경우 Ambassador 정보 로그 업데이트
    //     await conn.query(
    //       `INSERT INTO Ambass_Info_Log (User_ID, Year, Month)
    //       VALUES (?, YEAR(NOW()), MONTH(NOW()))
    //       ON DUPLICATE KEY UPDATE
    //         View = View + 1;`,
    //       [item.User_ID]
    //     );
    //   }
    //   // 이미지 경로 조합
    //   item.Profile_Img = "http://triptracks.co.kr/imgserver/" + item.Profile_Img;
    //   item.Image_Src = "http://triptracks.co.kr/imgserver/" + item.Image_Src;
    // }

    // return res.status(200).json(convertedPosts); // 최종 결과 응답
  } catch (error) {
    console.log(error); // 오류 로그
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end(); // DB 커넥션 해제
  }
});

module.exports = router;
