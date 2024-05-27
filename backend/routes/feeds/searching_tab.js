/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.05.27.
 * 코드 설명:
 * 사용자가 검색 시 게시글을 출력하는 API 스크립트
 */


var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// 태그 기반 게시글 검색
router.get("/search", async (req, res) => {
  const tags = req.query.tags; // 쿼리 파라미터에서 태그 추출

  if (!tags || tags.length === 0) {
    return res.status(400).json({ error: "태그를 하나 이상 입력하세요." });
  }

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 입력된 태그들을 배열로 분리
    const tagArray = tags.split(',');

    // 태그들을 기반으로 게시글 검색
    const searchQuery = `
      SELECT DISTINCT p.Post_ID, p.User_ID, p.Post_Caption, p.Post_Title, i.Image_Src
      FROM Post p
      JOIN Tag_List t ON p.Post_ID = t.Post_ID
      JOIN Post_Image i ON p.Post_ID = i.Post_ID
      WHERE t.Post_Tag IN (?)
      ORDER BY p.Post_ID DESC
    `;

    const [searchResults] = await conn.query(searchQuery, [tagArray]);
    
    if (searchResults.length === 0) {
      return res.status(404).json({ message: "해당 태그로 검색된 게시물이 없습니다." });
    }

    return res.status(200).json(searchResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;