/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.08.
 * 코드 설명:
 * 사용자가 이미지 업로드 시 사이즈를 맞춰서 저장하도록 하는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const util = require('util');

const upload = multer({ dest: 'imgServer/feeds/' });
const uploadMiddleware = upload.array('image');
router.use(uploadMiddleware);

// 이미지 업로드 및 데이터베이스에 저장
router.post('/', async (req, res) => {
  var imgSrcs = [];

  let conn;
  try {
    console.log(req.files);
    conn = await DBconn.getConnection();

    const images = req.files;

    const fsWriteFile = util.promisify(fs.writeFile);
    const fsUnlink = util.promisify(fs.unlink);
    for(const image of images){
      try {
        const buffer = await sharp(image.path)
          .resize({ width: 600 })
          .toBuffer();
    
        const imgFolder = 'imgServer/feeds/';
        const imgPath = `${imgFolder}${Date.now()}_${image.originalname.split('.')[0]}.jpg`;
    
        await fsWriteFile(imgPath, buffer);
        console.log("Image saved successfully");
    
        await fsUnlink(image.path);
        console.log(`Successfully deleted temporary file: ${image.path}`);
    
        imgSrcs.push(imgPath);
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
        return;
      }
    }
    await console.log(`저장된 이미지 갯수: ${imgSrcs.length}`)
    await imgSrcs.forEach(async src => await console.log(src))
    // const sql = 'INSERT INTO Post_Image (Img_Src) VALUES (?)';
    //         conn.query(sql, [imgPath], (dbErr, result) => {
    //           if (dbErr) {
    //             console.error(dbErr);
    //             res.status(500).send('Internal Server Error');
    //           } else {
    //             console.log('Image path saved to database');
    //           }
    //         });
    return res.json({ return: "따봉" });
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;