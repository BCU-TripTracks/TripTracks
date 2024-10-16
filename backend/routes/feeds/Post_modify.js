/***
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.04.16.
 * 코드 설명:
 * 사용자가 게시물 수정 시 저장하도록 하는 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const util = require("util");

const upload = multer({ dest: "imgServer/feeds/" });

// 게시물 수정
router.post("/", upload.array("image"), async (req, res) => {
  const { postId, tag, comment, Title } = req.body;
  const userId = req.session.User_ID;

  let conn;
  try {
    conn = await DBconn.getConnection();
    await conn.beginTransaction(); // 트랜잭션 시작

    // 게시글이 사용자의 게시글인지 확인
    const checkPostQuery = "SELECT User_ID FROM Post WHERE Post_ID = ?";
    const checkPostResult = await conn.query(checkPostQuery, [postId]);

    if (checkPostResult.length === 0 || checkPostResult[0].User_ID !== userId) {
      return res
        .status(403)
        .json({ error: "게시글을 수정할 권한이 없습니다." });
    }

    // 게시물 정보 수정
    const updatePostQuery =
      "UPDATE Post SET Post_Caption = ?, Post_Title = ? WHERE Post_ID = ?";
    await conn.query(updatePostQuery, [comment, Title, postId]);

    // 기존 태그 조회
    const selectTagsQuery = "SELECT Post_Tag FROM Tag_List WHERE Post_ID = ?";
    const existingTagsResult = await conn.query(selectTagsQuery, [postId]);
    const existingTags = existingTagsResult.map((row) => row.Post_Tag);

    // 태그가 수정되었는지 확인
    const newTags = tag ? tag.split(",").map((t) => t.trim()) : [];
    const isTagModified =
      newTags.length !== existingTags.length ||
      newTags.some((newTag) => !existingTags.includes(newTag));

    // 태그가 수정된 경우만 태그 삭제 및 재삽입
    if (isTagModified) {
      // 기존 태그 삭제
      const deleteTagListQuery = "DELETE FROM Tag_List WHERE Post_ID = ?";
      await conn.query(deleteTagListQuery, [postId]);

      // 새 태그 삽입
      if (newTags.length > 0) {
        for (const item of newTags) {
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
    }

    // 이미지 수정 여부 확인
    if (req.files && req.files.length > 0) {
      // 새로운 이미지가 업로드된 경우 기존 이미지를 삭제
      const selectImageQuery =
        "SELECT Image_Src FROM Post_Image WHERE Post_ID = ?";
      const images = await conn.query(selectImageQuery, [postId]);
      const fsUnlink = util.promisify(fs.unlink);

      for (const image of images) {
        const imgPath = `/home/ImgServer/${image.Image_Src}`;
        await fsUnlink(imgPath); // 기존 이미지 파일 삭제
      }

      // 기존 이미지 경로 데이터베이스에서 삭제
      const deleteImageQuery = "DELETE FROM Post_Image WHERE Post_ID = ?";
      await conn.query(deleteImageQuery, [postId]);

      // 새 이미지 업로드 및 저장
      const imgSrcs = [];
      const fsWriteFile = util.promisify(fs.writeFile);
      for (const image of req.files) {
        const buffer = await sharp(image.path)
          .resize({ width: 600 })
          .toBuffer();

        const imgFolder = "/home/ImgServer/feeds/";
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        const imgPath = `${imgFolder}${uniqueSuffix}_${userId}.jpg`;

        await fsWriteFile(imgPath, buffer);
        imgSrcs.push(imgPath);
        await fsUnlink(image.path); // 업로드된 임시 파일 삭제
      }

      // 새 이미지 경로 데이터베이스에 저장
      if (imgSrcs.length > 0) {
        const insertImagesQuery = `
          INSERT INTO Post_Image (Post_ID, Image_Src) 
          VALUES ${imgSrcs.map(() => "(?, ?)").join(", ")}`;
        const insertImageValues = [];
        imgSrcs.forEach((src) => {
          insertImageValues.push(postId, src.replace("/home/ImgServer/", ""));
        });
        await conn.query(insertImagesQuery, insertImageValues);
      }
    }

    await conn.commit(); // 트랜잭션 커밋

    return res
      .status(200)
      .json({ message: "게시물이 성공적으로 수정되었습니다." });
  } catch (error) {
    console.error(error);
    if (conn) await conn.rollback(); // 오류 발생 시 트랜잭션 롤백
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end(); // 연결 종료
  }
});

module.exports = router;
