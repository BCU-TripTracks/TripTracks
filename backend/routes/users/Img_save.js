/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.03.31.
 * 코드 설명:
 * 로그인 화면에서 Tag 상위 20개 게시물 노출을 위한 API 스크립트
 */
var express = require("express");
var router = express.Router();
const pool = require("../../utils/DBconn");
const multer = require('multer');
const sharp = require('sharp');

// 이미지 업로드를 위한 Multer 설정 (복수 이미지 업로드)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 이미지가 저장될 디렉토리
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // 이미지 파일 이름 설정
  }
});

const upload = multer({ storage: storage }).array('images', 10); // 최대 10장의 이미지 업로드 가능

// 이미지 업로드 및 데이터베이스에 경로 저장
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message }); // 업로드 오류 발생 시 에러 메시지 반환
    }

    // 업로드된 이미지 파일들의 경로
    const imagePaths = req.files.map(file => file.path);
    
    // 이미지 리사이징 및 가로 너비 600px로 조정 후 데이터베이스에 저장
    Promise.all(imagePaths.map(path => resizeAndSaveImage(path)))
      .then(results => {
        res.json({ resizedImages: results }); // 리사이징된 이미지 경로 반환
      })
      .catch(error => {
        res.status(500).json({ error: error.message }); // 리사이징 오류 발생 시 에러 메시지 반환
      });
  });
});

// 이미지 리사이징 및 데이터베이스에 저장하는 함수
function resizeAndSaveImage(imagePath) {
  return new Promise((resolve, reject) => {
    sharp(imagePath)
      .resize({ width: 600 }) // 이미지 리사이징 설정
      .toFile('uploads/resized-' + imagePath.split('/').pop(), (err, info) => {
        if (err) {
          reject(err); // 리사이징 오류 발생 시 reject
        } else {
          const resizedImagePath = 'resized-' + imagePath.split('/').pop();
          const sql = 'INSERT INTO Post_Image (Image_Src) VALUES (?)'; // 이미지 경로를 저장할 SQL 쿼리
          db.query(sql, [resizedImagePath], (err, result) => {
            if (err) {
              reject(err); // 데이터베이스 저장 오류 발생 시 reject
            } else {
              resolve(resizedImagePath); // 이미지 경로 저장 성공 시 resolve
            }
          });
        }
      });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = router;