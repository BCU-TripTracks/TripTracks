/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.03.12.
 * 코드 설명:
 * 프로필 정보 및 프로필 이미지를 업데이트하는 API 스크립트
 */

const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const util = require('util');

const upload = multer({ dest: 'imgServer/profiles/' });
const uploadMiddleware = upload.single('profileImage');
router.use(uploadMiddleware);

// 프로필 정보를 업데이트하고 프로필 이미지를 업로드하여 DB에 저장
router.post("/", uploadMiddleware, async (req, res, next) => {
  const user_Id = req.session.User_Id; // 수정할 유저의 아이디
  const newPassword = req.body.newPassword;
  const newUser_msg = req.body.newUser_msg;
  const userTags = req.body.userTags; // 사용자 태그

  let conn;
  try {
    conn = await DBconn.getConnection();
    
    // 프로필 정보를 업데이트
    await conn.query("UPDATE User_Info SET User_Pwd = ?, User_msg = ? WHERE User_ID = ?", [newPassword, newUser_msg, user_Id]); 

    // 사용자 태그 업데이트
    if (userTags && userTags.length > 0) {
      for (const tag of userTags) {
        await conn.query(
          `
          INSERT INTO User_Tags (User_ID, User_Tag) VALUES (?, ?) 
          ON DUPLICATE KEY UPDATE User_Tag = VALUES(User_Tag);
          `,
          [user_Id, tag]
        );
      }
    }

    // 프로필 이미지 업로드 및 DB에 이미지 주소 저장
    if (req.file) {
      const image = req.file;

      const buffer = await sharp(image.path)
        .resize({ width: 200 })
        .toBuffer();

      const imgFolder = 'imgServer/profiles/';
      const imgPath = `${imgFolder}${Date.now()}_${user_Id}.jpg`;

      await util.promisify(fs.writeFile)(imgPath, buffer);
      console.log("Profile image saved successfully");

      const sql = 'UPDATE User_Info SET Profile_Img = ? WHERE User_ID = ?';
      await conn.query(sql, [imgPath, user_Id]);
      console.log('Profile image path saved to database');

      await util.promisify(fs.unlink)(image.path);
      console.log(`Successfully deleted temporary file: ${image.path}`);
    }

    return res.json({ message: '프로필 정보가 성공적으로 업데이트되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '프로필 정보를 업데이트하는 중 오류가 발생했습니다.' });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;