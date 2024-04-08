/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.04.08.
 * 코드 설명:
* 사용자가 이미지 업로드 시 사이즈를 맞춰서 저장하도록 하는 API스크립트 
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const upload = multer({ dest: 'imgServer/feeds/' });
const uploadMiddleware = upload.array('image')
router.use(uploadMiddleware)
// 이미지 업로드 및 데이터베이스에 저장
router.post('/', async (req, res) => {
  let conn;
  try {
    console.log(req.files)
    conn = await DBconn.getConnection();

    const images = req.files;
    await images.forEach(async image => {
      await sharp(image.path)
        .resize({ width: 600 })
        .toBuffer(async (err, buffer, info) => {
          if (err) {
            return res.status(500).send(err);
          }
          const imgFolder = 'imgServer/feeds/';
          const imgPath = `${imgFolder}${Date.now()}_${image.originalname.split('.')[0]}.jpg`;
          await fs.writeFile(imgPath, buffer, (fsErr) => {
            if (fsErr) {
              return res.status(500).send(fsErr);
            }
            console.log("Image saved successfully");
            
          });
          await fs.unlink(image.path, (unlinkErr) => {
            if (unlinkErr) {
              console.error(`Failed to delete temporary file: ${image.path}`, unlinkErr);
            } else {
              console.log(`Successfully deleted temporary file: ${image.path}`);
            }
          });
        });
    });
    return res.json({return: "따봉"})
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;