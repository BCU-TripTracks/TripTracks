/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.16.
 * 코드 설명:
 * 게시물 출력과 팔로우 정보를 받아오는 API 스크립트
 */

const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");

// 게시물 및 팔로우 정보를 함께 가져오는 API
router.get("/:Post_ID", async (req, res) => {
  const postId = req.params.Post_ID;
  const user_ID = req.session.User_ID;
  console.log(postId);
  let conn;
  try {
    conn = await DBconn.getConnection();

    // 게시물 정보 가져오기
    const selectPostQuery = `
      SELECT Post.Post_ID, 
      Post.User_ID, 
      Post.Post_Caption, 
      Post.Post_Like, 
      Post.Post_Create_Timestamp, 
      Post.Post_Title, 
      Post_Image.Image_Src, 
      User_Info.Profile_Img,
      User_Info.User_Rule
      FROM Post 
      LEFT JOIN Post_Image ON Post.Post_ID = Post_Image.Post_ID 
      LEFT JOIN User_Info ON Post.User_ID = User_Info.User_ID
      WHERE Post.Post_ID = ?;
    `;
    const postResult = await conn.query(selectPostQuery, [postId]);
    const post = postResult[0];
    // 피드의 작성자가 앰버서더인경우 db 카운트 업데이트
    if (post.User_Rule === 1)
      await conn.query(
        `INSERT INTO Ambass_Info_Log (User_ID, Year, Month) 
        VALUES (?, YEAR(NOW()), MONTH(NOW())) 
        ON DUPLICATE KEY UPDATE 
          Detail_View = Detail_View + 1;`,
        [post.User_ID]
      );
    post.Image_Src = "http://triptracks.co.kr/imgserver/" + post.Image_Src;
    post.Profile_Img = "http://triptracks.co.kr/imgserver/" + post.Profile_Img;
    // 팔로우 정보 가져오기
    const selectFollowQuery = `
      SELECT * FROM Follow 
      WHERE toUser_ID = ? AND fromUser_ID = ?;
    `;
    const followResult = await conn.query(selectFollowQuery, [post.User_ID, user_ID]);
    const isFollowing = followResult.length > 0;
    // 태그 정보 가져오기
    const selectTagsQuery = `
    SELECT Post_Tag 
    FROM Tag_List 
    WHERE Post_ID = ?;
  `;
    const tagsResult = await conn.query(selectTagsQuery, [postId]);
    const tags = tagsResult.map((tagRow) => tagRow.Post_Tag);

    // 팔로우 정보 확인하여 결과 반환
    const isFollowedByCurrentUser = post.User_ID === user_ID || isFollowing;

    return res.status(200).json({ post, tags, isFollowedByCurrentUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
