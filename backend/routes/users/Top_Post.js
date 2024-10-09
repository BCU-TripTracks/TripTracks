/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.03.31.
 * 코드 설명:
 * 로그인 화면에서 Tag 상위 20개 게시물 노출을 위한 API 스크립트
 */
var express = require("express");
var router = express.Router();
const pool = require("../../utils/DBconn");

router.get("/", async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();

    const topPosts = await conn.query(`
      SELECT 
          P.Post_Title, 
          P.Post_Caption, 
          MIN(PI.Image_Src) AS Image_Src, 
    IFNULL(CAST(COUNT(PL.Post_ID) AS CHAR), '0') AS likeCount
      FROM Post P
      LEFT JOIN Post_Image PI ON P.Post_ID = PI.Post_ID 
      LEFT JOIN Post_Like PL ON P.Post_ID = PL.Post_ID
      GROUP BY P.Post_ID
      ORDER BY likeCount DESC
      LIMIT 20;
      `);
    for (let item of topPosts) {
      item.Image_Src = "http://triptracks.co.kr/imgserver/" + item.Image_Src;
    }
    return res.status(200).send({ Result: "Success", TopPosts: topPosts });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ Result: "게시물 연결 실패", Top_PostError: error });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
