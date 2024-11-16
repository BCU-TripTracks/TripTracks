/**
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.10.6.
 * 코드 설명:
 * 설정한 태그에 가장 부합한 게시물 20개와 이미지 경로, 프로필 이미지 경로, isLike 및 isSave 정보를 함께 가져오는 API 스크립트
 */

const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 사용자의 태그 목록 가져오는 API
router.get("/", async (req, res) => {
  const { User_ID } = req.session; // 사용자 ID 추출

  let conn;
  try {
    conn = await DBconn.getConnection();

    const User_Tags_List = await conn.query(
      `SELECT User_Tag FROM User_Tags WHERE User_ID = ?`,
      [User_ID]
    );

    const Tags = User_Tags_List.map((row) => row.User_Tag);

    return res.status(200).json(Tags);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

// 설정한 태그를 기반으로 관련 게시물 가져오기 (isLike 및 isSave 포함)
router.post("/searchByTags", async (req, res) => {
  const { User_ID } = req.session; // 세션에서 User_ID를 가져옴
  const { tags } = req.body; // 사용자가 입력한 태그 목록

  if (!tags || tags.length === 0) {
    return res.status(400).json({ error: "태그 목록이 비어 있습니다." });
  }

  let conn;
  try {
    conn = await DBconn.getConnection(); // DB 커넥션 얻기

    // 선택한 태그에 부합하는 게시물의 Post_ID 목록 가져오기
    const SelectPostsList = await conn.query(
      `
      SELECT DISTINCT Post_ID
      FROM Tag_List
      WHERE Post_Tag IN (${tags.map(() => "?").join(", ")});
      `,
      tags
    );

    if (SelectPostsList.length === 0) {
      return res.status(200).json([]);
    }

    // Post_ID 배열 생성
    const postIds = SelectPostsList.map((row) => row.Post_ID);

    // 관련 게시물 정보를 가져오기 (isLike 및 isSave 포함)
    const Post_List = await conn.query(
      `
      SELECT 
        CAST(Post.Post_ID AS CHAR) AS Post_ID,
        Post.Post_Title,
        Post.Post_Caption,
        MIN(Post_Image.Image_Src) AS Image_Src,
        CAST(Post.User_ID AS CHAR) AS User_ID,
        User_Info.Profile_Img,
        User_Info.User_Rule,
        IFNULL(CAST(Post_Like.likeCount AS CHAR), '0') AS likeCount,
        IF(Post_Like_User.User_ID IS NOT NULL, 1, 0) AS isLike,
        IF(
          (User_Info.User_Rule = 1 AND Ambass_Save_User.User_ID IS NOT NULL) OR 
          (User_Info.User_Rule = 0 AND Post_Save_User.User_ID IS NOT NULL),
          1, 0
        ) AS isSave
      FROM Post
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
      WHERE Post.Post_ID IN (${postIds.map(() => "?").join(", ")})
      GROUP BY Post.Post_ID
      ORDER BY Post.Post_ID DESC
      LIMIT 20;
      `,
      [User_ID, User_ID, User_ID, ...postIds]
    );

    // 이미지 경로 및 프로필 이미지 경로 수정
    for (let item of Post_List) {
      item.Profile_Img =
        "http://triptracks.co.kr/imgserver/" + item.Profile_Img;
      item.Image_Src = "http://triptracks.co.kr/imgserver/" + item.Image_Src;
    }

    return res.status(200).json(Post_List); // 최종 결과 응답
  } catch (error) {
    console.error(error); // 오류 로그 출력
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end(); // DB 커넥션 해제
  }
});

module.exports = router;
