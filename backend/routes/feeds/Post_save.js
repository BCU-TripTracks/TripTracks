/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.16.
 * 코드 설명:
 * 사용자가 게시물 업로드 시 저장하도록 하는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const util = require("util");

const upload = multer({ dest: "imgServer/feeds/" });

// 이미지 업로드 및 데이터베이스에 저장
router.post("/", upload.array("image"), async (req, res) => {
  const user_Id = req.session.User_ID;
  const { tag, comment, image } = req.body; // 사용자 ID, 태그, 코멘트 추출
  console.log(req.body);

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 게시물 정보 데이터베이스에 저장
    const insertPostQuery =
      "INSERT INTO Post (User_ID, Post_Caption) VALUES (?, ?)";
    await conn.query(insertPostQuery, [user_Id, comment]);

    // 최근 삽입된 게시물 ID를 가져옴
    const selectPostIdQuery =
      "SELECT Post_ID FROM Post WHERE User_ID = ? ORDER BY Post_ID DESC LIMIT 1";
    const postIdResult = await conn.query(selectPostIdQuery, [user_Id]);
    const postId = postIdResult[0].Post_ID;
    console.log(postId);

    // 태그 정보 데이터베이스에 저장
    if (tag && tag.length > 0) {
      for (const item of tag) {
        await conn.query(
          `
        INSERT INTO Tags_Info (Tag) VALUES (?) 
        ON DUPLICATE KEY UPDATE Tag = VALUES(Tag);
        `,
          [item]
        );
        const insertTagQuery =
          "INSERT INTO Tag_List (Post_ID, Post_Tag) VALUES (?, ?)";
        await conn.query(insertTagQuery, [postId, item]);
      }
    }

    // 이미지 정보 처리
    const imgSrcs = [];
    const fsWriteFile = util.promisify(fs.writeFile);
    const fsUnlink = util.promisify(fs.unlink);
    for (const image of req.files) {
      try {
        const buffer = await sharp(image.path)
          .resize({ width: 600 })
          .toBuffer();

        const imgFolder = "imgServer/feeds/";
        const imgPath = `${imgFolder}${Date.now()}_${
          image.originalname.split(".")[0]
        }.jpg`;

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

    // 이미지 경로 데이터베이스에 저장
    for (const src of imgSrcs) {

      const sql = "INSERT INTO Post_Image (Post_ID, Image_Src) VALUES (?, ?)";
      await conn.query(sql, [postId, src.replace('imgServer/', '')], (dbErr, result) => {
        if (dbErr) {
          console.error(dbErr);
          res.status(500).send("Internal Server Error");
        } else {
          console.log("Image path saved to database");
        }
      });
    }

    return res
      .status(200)
      .json({ message: "게시물이 성공적으로 업로드되었습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
