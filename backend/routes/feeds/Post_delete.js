/**
 * 코드 최초 작성자: 서현진
 * 코드 최초 작성일: 2024.05.13.
 * 코드 설명:
 * 사용자가 게시물을 삭제하는 API 스크립트
 */
var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");
const fs = require("fs");
const util = require("util");

// 게시글 삭제
router.post("/", async (req, res) => {
  const postId = req.body.postId;
  const userId = req.session.User_ID;
  const Image_Srcs = req.body.Image_Srcs;
  let conn;
  try {
    conn = await DBconn.getConnection();
    console.log("DB connection established.");

    // 게시글이 사용자의 게시글인지 확인
    const checkPostQuery = "SELECT User_ID FROM Post WHERE Post_ID = ?";
    const checkPostResult = await conn.query(checkPostQuery, [postId]);
    console.log("Post ownership checked:", checkPostResult);

    if (checkPostResult.length === 0 || checkPostResult[0].User_ID !== userId) {
      console.log("User does not have permission to delete this post.");
      return res
        .status(403)
        .json({ error: "게시글을 삭제할 권한이 없습니다." });
    }

    // 이미지 경로를 가져와서 파일 삭제
    const getImagePathsQuery =
      "SELECT Image_Src FROM Post_Image WHERE Post_ID = ?";
    const imagePathsResult = await conn.query(getImagePathsQuery, [postId]);
    console.log("Image paths retrieved:", imagePathsResult);

    const fsUnlink = util.promisify(fs.unlink);
    for (const imagePath of imagePathsResult) {
      const fullPath = `${imagePath.Image_Srcs}`;
      try {
        await fsUnlink(fullPath);
        console.log(`Successfully deleted file: ${fullPath}`);
      } catch (err) {
        // 오류 발생 시에도 로그를 남기고 다음 파일로 넘어감
        console.error(`Error deleting file: ${fullPath}`, err);
      }
    }
    console.log("All image files processed for deletion.");

    // 데이터베이스에서 게시글 관련 정보 삭제
    try {
      const deletePostImageQuery = "DELETE FROM Post_Image WHERE Post_ID = ?";
      const deleteTagListQuery = "DELETE FROM Tag_List WHERE Post_ID = ?";
      const deletePostQuery = "DELETE FROM Post WHERE Post_ID = ?";

      await conn.query(deletePostImageQuery, [postId]);
      console.log("Post images deleted from database.");

      await conn.query(deleteTagListQuery, [postId]);
      console.log("Post tags deleted from database.");

      await conn.query(deletePostQuery, [postId]);
      console.log("Post deleted from database.");

      return res
        .status(200)
        .json({ message: "게시글이 성공적으로 삭제되었습니다." });
    } catch (error) {
      // 데이터베이스 삭제 중 오류 발생 시 처리
      console.error("데이터베이스 삭제 중 오류가 발생했습니다.", error);
      return res
        .status(500)
        .json({ error: "게시글 삭제 중 오류가 발생했습니다." });
    }
  } catch (error) {
    console.error("Unexpected error occurred:", error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) {
      conn.end();
      console.log("DB connection closed.");
    }
  }
});

module.exports = router;
