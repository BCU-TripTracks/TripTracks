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

    const topPosts = await conn.query("SELECT Post_Caption, Image_Src FROM Post JOIN Post_Image ON Post.Post_ID = Post_Image.Post_ID ORDER BY Post_Like DESC LIMIT 20;");

    return res.status(200).send({ Result: "Success", TopPosts: topPosts });
  }catch(error){
    return res.status(400).send({Result: "게시물 연결 실패", Top_PostError: error});
  }
  finally{
    if(conn) conn.end()
  }
});

module.exports = router;