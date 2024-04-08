/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.08.
 * 코드 설명:
 * 이미지 경로를 클라이언트로 보내는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

// 이미지 경로를 클라이언트로 전송
router.get('/:post_id', async (req, res) => {
  const { post_id } = req.params;

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 데이터베이스에서 해당 포스트의 이미지 경로를 가져옴
    const sql = 'SELECT Img_Src FROM Post_Image WHERE Post_ID = ?';
    conn.query(sql, [post_id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      const imgSrcs = result.map(row => row.Img_Src);

      // 클라이언트로 이미지 경로 배열을 전송
      res.json({ imgSrcs });
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;