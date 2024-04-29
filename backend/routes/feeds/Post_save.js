/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.16.
 * 코드 설명:
 * 사용자가 게시물 업로드 시 저장하도록 하는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");
const Img_save = require("./Img_save"); // Img_save.js 파일 불러오기

// 이미지 업로드 및 데이터베이스에 저장
router.post('/', async (req, res) => {
  const { User_ID, tag, comment, image } = req.body; // 사용자 ID, 태그, 코멘트, 이미지 정보 추출
  let conn;
  try {
    conn = await DBconn.getConnection();

    // 게시물 정보 데이터베이스에 저장
    const insertPostQuery = 'INSERT INTO Post (User_ID, Post_Caption) VALUES ?';
    const postResult = await conn.query(insertPostQuery, [User_ID, comment]);
    const postId = postResult.insertId; // 삽입된 게시물 ID
 
    // 태그 정보 데이터베이스에 저장
    if (tag && tag.length > 0) {
      const tagValues = tag.map(tag => [postId, tag]);
      const insertTagQuery = 'INSERT INTO Tag_List (Post_ID, Post_Tag) VALUES ?';
      await conn.query(insertTagQuery, [tagValues]);
    }

    // 이미지 저장을 위해 Img_save.js 호출
    req.files = image; // 이미지 정보 설정
    await Img_save(req, res); // 이미지 저장 API 호출

    return res.status(200).json({ message: '게시물이 성공적으로 업로드되었습니다.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '내부 서버 오류가 발생했습니다.' });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;