var express = require("express");
var router = express.Router();
const pool = require("../../utils/DBconn");

router.use("/", async (req, res, next) => {
  const { User_ID } = req.session;
  const { Post_ID } = req.body;
  if (!User_ID) return res.status(501).json({ success: false, msg: "로그인이 필요합니다." });
  let conn;
  try {
    conn = await pool.getConnection();
    //권환 조회
    let [User_Info] = await conn.query("SELECT User_Rule FROM User_Info WHERE User_ID=?", [User_ID]);
    if (!User_Info) return res.status(501).json({ success: false, msg: "사용자 정보를 찾을 수 없습니다." });
    if (User_Info.User_Rule !== 1) return res.status(501).json({ success: false, msg: "권한이 없습니다." });

    // 쿼리 실행
    let post_info = {};

    // 게시물 정보 가져오기
    let [post] = await conn.query(
      `
  SELECT 
      P.Post_Caption,
      P.Post_Title,
      P.Post_Create_Timestamp,
      P.Post_Edit_Timestamp
  FROM Post P
  WHERE P.Post_ID = ?
`,
      [Post_ID]
    );

    // 게시물 이미지 가져오기
    let images = await conn.query(
      `
  SELECT 
      PI.Image_Src
  FROM Post_Image PI
  WHERE PI.Post_ID = ?
`,
      [Post_ID]
    );

    // 게시물 댓글 가져오기
    let comments = await conn.query(
      `
  SELECT 
    PC.User_ID AS Comment_User_ID,
    PC.Comment_Text,
    PC.Comment_Timestamp,
    UI.Profile_Img
FROM Post_Comments PC
LEFT JOIN User_Info UI ON PC.User_ID = UI.User_ID
WHERE PC.Post_ID = ?
`,
      [Post_ID]
    );

    // 게시물 좋아요 가져오기
    let likes = await conn.query(
      `
  SELECT 
    PL.User_ID AS Like_User_ID,
    UI.Profile_Img
FROM Post_Like PL
LEFT JOIN User_Info UI ON PL.User_ID = UI.User_ID
WHERE PL.Post_ID = ?
`,
      [Post_ID]
    );

    // 게시물 로그 가져오기
    let logs = await conn.query(
      `
  SELECT 
      PLG.User_ID AS Log_User_ID,
      PLG.Log_Date,
      PLG.Feed_Like,
      PLG.View,
      PLG.Detail_View,
      PLG.Comment
  FROM Post_Log PLG
  WHERE PLG.Post_ID = ?
`,
      [Post_ID]
    );

    // 데이터 병합
    post_info = {
      ...post,
      Images: images.map((image) => "http://triptracks.co.kr/imgserver/" + image.Image_Src),
      Comments: comments.map((comment) => ({
        User_ID: comment.Comment_User_ID,
        Profile_Img: "http://triptracks.co.kr/imgserver/" + comment.Profile_Img,
        Comment: comment.Comment_Text,
        Timestamp: comment.Comment_Timestamp,
      })),
      Likes: likes.map((like) => ({
        User_ID: like.Like_User_ID,
        Profile_Img: "http://triptracks.co.kr/imgserver/" + like.Profile_Img,
      })),
      Logs: logs.map((log) => ({
        User_ID: log.Log_User_ID,
        Date: log.Log_Date,
        Feed_Like: log.Feed_Like,
        View: log.View,
        Detail_View: log.Detail_View,
        Comment: log.Comment,
      })),
    };

    console.log(post_info);

    // Image_Src: "http://triptracks.co.kr/imgserver/" + element.Image_Src,

    return res.status(200).json({
      post_info,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "앰버서더 점수 설정 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
