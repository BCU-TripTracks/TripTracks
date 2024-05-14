/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.03.12.
 * 코드 설명:
 * 프로필 정보 및 프로필 이미지를 업데이트하는 API 스크립트
 */

const express = require("express");
const router = express.Router();
const DBconn = require("../../utils/DBconn");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const util = require("util");

// 파일 업로드를 위한 multer 설정
const upload = multer({ dest: "imgServer/profiles/" });
const uploadMiddleware = upload.single("Profile_Img");

// 프로필 정보를 업데이트하고 프로필 이미지를 업로드하여 DB에 저장
router.post("/", uploadMiddleware, async (req, res) => {
  const _User_ID = req.session.User_ID; // 수정할 유저의 아이디
  const { User_ID, User_Pwd, User_Tag, User_Msg } = req.body;

  if (!_User_ID) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }
  if (User_ID !== _User_ID) {
    return res.status(403).json({ message: "수정 권한이 없습니다." });
  }

  try {
    const conn = await DBconn.getConnection();

    // 프로필 정보 업데이트
    if (User_Pwd) await conn.query("UPDATE User_Info SET User_Pwd = ? WHERE User_ID = ?", [User_Pwd, User_ID]);
    if (User_Msg) await conn.query("UPDATE User_Info SET User_Msg = ? WHERE User_ID = ?", [User_Msg, User_ID]);

    // 사용자 태그 전체 삭제 후 업데이트
    if (User_Tag) {
      await conn.query("DELETE FROM User_Tags WHERE User_ID = ?", [User_ID]);
      if (User_Tag && User_Tag.length > 0) {
        for (const tag of User_Tag) {
          await conn.query("INSERT INTO Tags_Info (Tag) VALUES (?) ON DUPLICATE KEY UPDATE Tag = VALUES(Tag)", [tag]);
          await conn.query(
            "INSERT INTO User_Tags (User_ID, User_Tag) VALUES (?, ?) ON DUPLICATE KEY UPDATE User_Tag = VALUES(User_Tag)",
            [User_ID, tag]
          );
        }
      }
    }

    // 프로필 이미지 처리
    if (req.file) {
      const image = req.file;
      const buffer = await sharp(image.path).resize({ width: 200 }).toBuffer();
      const imgFolder = "imgServer/";
      const imgPath = `profiles/${Date.now()}_${User_ID}.jpg`;

      await util.promisify(fs.writeFile)(`${imgFolder}${imgPath}`, buffer);
      await conn.query("UPDATE User_Info SET Profile_Img = ? WHERE User_ID = ?", [imgPath, User_ID]);
      await util.promisify(fs.unlink)(image.path);
    }

    res.json({ message: "프로필 정보가 성공적으로 업데이트되었습니다." });
  } catch (err) {
    console.error("Database or file system error:", err);
    res.status(500).json({ message: "프로필 정보를 업데이트하는 중 오류가 발생했습니다." });
  }
});

module.exports = router;
