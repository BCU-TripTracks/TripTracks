/***
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
router.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.session.User_ID;

  let conn;
  try {
    conn = await DBconn.getConnection();

    // 게시글이 사용자의 게시글인지 확인
    const checkPostQuery = "SELECT User_ID FROM Post WHERE Post_ID = ?";
    const [checkPostResult] = await conn.query(checkPostQuery, [postId]);

    if (checkPostResult.length === 0 || checkPostResult[0].User_ID !== userId) {
      return res.status(403).json({ error: "게시글을 삭제할 권한이 없습니다." });
    }

    // 이미지 경로를 가져와서 파일 삭제
    const getImagePathsQuery = "SELECT Image_Src FROM Post_Image WHERE Post_ID = ?";
    const [imagePathsResult] = await conn.query(getImagePathsQuery, [postId]);

    const fsUnlink = util.promisify(fs.unlink);
    for (const imagePath of imagePathsResult) {
      const fullPath = `imgServer/${imagePath.Image_Src}`;
      try {
        await fsUnlink(fullPath);
        console.log(`Successfully deleted file: ${fullPath}`);
      } catch (err) {
        console.error(`Error deleting file: ${fullPath}`, err);
      }
    }

    // 데이터베이스에서 게시글 관련 정보 삭제
    const deletePostImageQuery = "DELETE FROM Post_Image WHERE Post_ID = ?";
    const deleteTagListQuery = "DELETE FROM Tag_List WHERE Post_ID = ?";
    const deletePostQuery = "DELETE FROM Post WHERE Post_ID = ?";

    await conn.query(deletePostImageQuery, [postId]);
    await conn.query(deleteTagListQuery, [postId]);
    await conn.query(deletePostQuery, [postId]);

    return res.status(200).json({ message: "게시글이 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "내부 서버 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;