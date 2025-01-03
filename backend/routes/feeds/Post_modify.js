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
  const { postId, tag, comment, Title, locate } = req.body; // locate 포함
  const userId = req.session.User_ID;

  let conn;
  try {
    conn = await DBconn.getConnection();
    await conn.beginTransaction(); // 트랜잭션 시작

    // 게시물 정보 수정
    const updatePostQuery =
      "UPDATE Post SET Post_Caption = ?, Post_Title = ? WHERE Post_ID = ?";
    await conn.query(updatePostQuery, [comment, Title, postId]);

    // 태그 수정 로직
    const selectTagsQuery = "SELECT Post_Tag FROM Tag_List WHERE Post_ID = ?";
    const existingTagsResult = await conn.query(selectTagsQuery, [postId]);
    const existingTags = existingTagsResult.map((row) => row.Post_Tag);

    const newTags = tag ? tag.split(",").map((t) => t.trim()) : [];
    const isTagModified =
      newTags.length !== existingTags.length ||
      newTags.some((newTag) => !existingTags.includes(newTag));

    if (isTagModified) {
      const deleteTagListQuery = "DELETE FROM Tag_List WHERE Post_ID = ?";
      await conn.query(deleteTagListQuery, [postId]);

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

    // 장소 수정 로직
    // const locations = locate ? JSON.parse(locate) : [];
    // const deleteLocationQuery = "DELETE FROM Post_location WHERE Post_ID = ?";
    // await conn.query(deleteLocationQuery, [postId]);

    // if (Array.isArray(locations) && locations.length > 0) {
    //   for (const location of locations) {
    //     const { name, id } = location;
    //     if (!name || !id) {
    //       throw new Error(
    //         "location_name 또는 location_ID 정보가 누락되었습니다."
    //       );
    //     }
    //     const insertLocationQuery = `
    //       INSERT INTO Post_location (Post_ID, location_name, location_ID)
    //       VALUES (?, ?, ?)`;
    //     await conn.query(insertLocationQuery, [postId, name, id]);
    //   }
    // }

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
