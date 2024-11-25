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
  let { tag, comment, Title, locate } = req.body; // place 배열 포함
  console.log(req.body);

  let conn;
  try {
    conn = await DBconn.getConnection();
    await conn.beginTransaction(); // 트랜잭션 시작

    // 게시물 정보 데이터베이스에 저장
    const insertPostQuery =
      "INSERT INTO Post (User_ID, Post_Caption, Post_Title) VALUES (?, ?, ?)";
    await conn.query(insertPostQuery, [user_Id, comment, Title]);

    // 최근 삽입된 게시물 ID를 가져옴
    const selectPostIdQuery =
      "SELECT Post_ID FROM Post WHERE User_ID = ? ORDER BY Post_ID DESC LIMIT 1";
    const postIdResult = await conn.query(selectPostIdQuery, [user_Id]);
    const postId = postIdResult[0].Post_ID;
    console.log(postId);

    // 태그 문자열을 쉼표 기준으로 분리
    const tags = tag ? tag.split(",").map((t) => t.trim()) : []; // trim()으로 공백 제거

    // 태그 정보 데이터베이스에 저장
    if (tags.length > 0) {
      for (const item of tags) {
        await conn.query(
          `INSERT INTO Tags_Info (Tag) VALUES (?) 
          ON DUPLICATE KEY UPDATE Tag = VALUES(Tag);`,
          [item]
        );
        const insertTagQuery =
          "INSERT INTO Tag_List (Post_ID, Post_Tag) VALUES (?, ?)";
        await conn.query(insertTagQuery, [postId, item]);
      }
    }

    // 장소 데이터 처리 및 저장
    const locations = req.body.locate ? JSON.parse(req.body.locate) : [];
    if (Array.isArray(locations) && locations.length > 0) {
      for (const location of locations) {
        const { name, id } = location;
        console.log(name);
        if (!name || !id) {
          throw new Error(
            "location_name 또는 location_ID 정보가 누락되었습니다."
          );
        }

        const insertLocationQuery = `
      INSERT INTO Post_location (Post_ID, location_name, location_ID) 
      VALUES (?, ?, ?)`;
        await conn.query(insertLocationQuery, [postId, name, id]);
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

        const imgFolder = "/home/ImgServer/feeds/";
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        const imgPath = `${imgFolder}${uniqueSuffix}_${user_Id}.jpg`;

        await fsWriteFile(imgPath, buffer);
        console.log("Image saved successfully");

        await fsUnlink(image.path); // 임시 파일 삭제
        imgSrcs.push(imgPath);
      } catch (err) {
        console.error(err);
        await conn.rollback(); // 트랜잭션 롤백
        res.status(500).send(err);
        return;
      }
    }

    // 이미지 경로를 한 번에 데이터베이스에 저장
    if (imgSrcs.length > 0) {
      const insertImagesQuery = `
        INSERT INTO Post_Image (Post_ID, Image_Src) 
        VALUES ${imgSrcs.map(() => "(?, ?)").join(", ")}`;

      const insertImageValues = [];
      imgSrcs.forEach((src) => {
        insertImageValues.push(postId, src.replace("/home/ImgServer/", ""));
      });

      await conn.query(insertImagesQuery, insertImageValues);
      console.log("Image paths saved to database");
    }

    await conn.commit(); // 트랜잭션 커밋

    return res
      .status(200)
      .json({ message: "게시물이 성공적으로 업로드되었습니다." });
  } catch (error) {
    console.error(error);
    if (conn) await conn.rollback(); // 오류 발생 시 트랜잭션 롤백
    return res
      .status(500)
      .json({ error: error.message || "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end(); // 연결 종료
  }
});

module.exports = router;
