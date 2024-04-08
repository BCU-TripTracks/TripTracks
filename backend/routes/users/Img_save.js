/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.04.08.
 * 코드 설명:
* 사용자가 이미지 업로드 시 사이즈를 맞춰서 저장하도록 하는 API스크립트 
 */
const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");
const multer = require('multer');
const sharp = require('sharp');

// 이미지 업로드를 위한 Multer 설정 (한 번에 하나의 파일만 업로드)
const upload = multer();

// 이미지 업로드 및 데이터베이스에 저장
router.post('/', upload.single('image'), async (req, res) => {
  let conn;
  try {
    conn = await DBconn.getConnection();
    sharp(req.file.buffer)
      .resize({ width: 600 })
      .toBuffer()
      .then(data => {
        const base64Image = data.toString('base64');

        // 데이터베이스 연결을 통해 이미지 저장
        const sql = 'INSERT INTO Post_Image (Img_Src) VALUES (?)';
        conn.query(sql, [base64Image], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.status(200).send('Image uploaded and saved to database');
          }
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;