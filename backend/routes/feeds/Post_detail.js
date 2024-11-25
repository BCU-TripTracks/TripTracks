/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.16.
 * 코드 설명:
 * 게시물 출력과 팔로우 정보를 받아오는 API 스크립트
 */
const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 게시물 및 위치 정보를 함께 가져오는 API
router.get("/:Post_ID", async (req, res) => {
  const postId = req.params.Post_ID;
  const user_ID = req.session.User_ID;

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 게시물 정보 가져오기
    const selectPostQuery = `
      SELECT 
        Post.Post_ID, 
        Post.User_ID, 
        Post.Post_Caption, 
        Post.Post_Like, 
        Post.Post_Create_Timestamp, 
        Post.Post_Title, 
        User_Info.Profile_Img,
        User_Info.User_Rule,
        IFNULL(CAST(Post_Like.likeCount AS CHAR), '0') AS likeCount,
        IF(Post_Like_User.User_ID IS NOT NULL, 1, 0) AS isLike,
        GROUP_CONCAT(Post_Image.Image_Src SEPARATOR ',') AS Image_Srcs
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
      WHERE Post.Post_ID = ?
      GROUP BY Post.Post_ID, User_Info.Profile_Img, User_Info.User_Rule;
    `;
    const postResult = await conn.query(selectPostQuery, [user_ID, postId]);
    const post = postResult[0];

    // 이미지 URL을 배열로 변환
    if (post.Image_Srcs) {
      post.Image_Srcs = post.Image_Srcs.split(",").map(
        (src) => "http://triptracks.co.kr/imgserver/" + src
      );
    } else {
      post.Image_Srcs = [];
    }

    // 프로필 이미지 URL 설정
    post.Profile_Img = "http://triptracks.co.kr/imgserver/" + post.Profile_Img;

    // 피드의 작성자가 앰버서더인 경우 db 카운트 업데이트
    if (post.User_Rule === 1) {
      await conn.query(
        `INSERT INTO Ambass_Info_Log (User_ID, Year, Month) 
        VALUES (?, YEAR(NOW()), MONTH(NOW())) 
        ON DUPLICATE KEY UPDATE 
          Detail_View = Detail_View + 1;`,
        [post.User_ID]
      );

      // Post_Log 테이블에 일간 Detail_View 증가 기록
      await conn.query(
        `INSERT INTO Post_Log (Post_ID, Log_Date, User_ID, Detail_View)
         VALUES (?, CURDATE(), ?, 1)
         ON DUPLICATE KEY UPDATE Detail_View = Detail_View + 1;`,
        [postId, post.User_ID]
      );
    }

    // 팔로우 정보 가져오기
    const selectFollowQuery = `
      SELECT * FROM Follow 
      WHERE toUser_ID = ? AND fromUser_ID = ?;
    `;
    const followResult = await conn.query(selectFollowQuery, [
      post.User_ID,
      user_ID,
    ]);
    const isFollowing = followResult.length > 0;

    // 태그 정보 가져오기
    const selectTagsQuery = `
      SELECT Post_Tag 
      FROM Tag_List 
      WHERE Post_ID = ?;
    `;
    const tagsResult = await conn.query(selectTagsQuery, [postId]);
    const tags = tagsResult.map((tagRow) => tagRow.Post_Tag);

    // 위치 정보 가져오기
    const selectLocationsQuery = `
      SELECT location_name, location_ID 
      FROM Post_location 
      WHERE Post_ID = ?;
    `;
    const locationsResult = await conn.query(selectLocationsQuery, [postId]);
    const locations = locationsResult.map((location) => ({
      name: location.location_name,
      id: location.location_ID,
    }));

    // 팔로우 정보 확인하여 결과 반환
    const isFollowedByCurrentUser = post.User_ID === user_ID || isFollowing;

    return res
      .status(200)
      .json({ post, tags, locations, isFollowedByCurrentUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
