var express = require("express");
var router = express.Router();
const pool = require("../../utils/DBconn");

router.use("/", async (req, res, next) => {
  const { User_ID } = req.session;
  const { Type } = req.body;
  if (!User_ID) return res.status(501).json({ success: false, msg: "로그인이 필요합니다." });
  let conn;
  try {
    conn = await pool.getConnection();
    //권환 조회
    let [User_Info] = await conn.query("SELECT User_Rule FROM User_Info WHERE User_ID=?", [User_ID]);
    if (!User_Info) return res.status(501).json({ success: false, msg: "사용자 정보를 찾을 수 없습니다." });
    if (User_Info.User_Rule !== 1) return res.status(501).json({ success: false, msg: "권한이 없습니다." });

    let Now_Month_Info_Log = await conn.query(
      `
      SELECT 
    p.Post_ID,
    p.User_ID,
    p.Post_Title,
    p.Post_Caption,
    p.Post_Create_Timestamp,
    p.Post_Edit_Timestamp,
    Cur.Feed_Like AS Cur_Feed_Like,
    Pre.Feed_Like AS Pre_Feed_Like,
    Cur.View AS Cur_View,
    Pre.View AS Pre_View,
    Cur.Detail_View AS Cur_Detail_View,
    Pre.Detail_View AS Pre_Detail_View,
    Cur.Comment AS Cur_Comment,
    Pre.Comment AS Pre_Comment,
    Cur.Image_Src
FROM Post p
JOIN (
    SELECT 
        pl.Post_ID,
        SUM(pl.Feed_Like) AS Feed_Like,
        SUM(pl.View) AS View,
        SUM(pl.Detail_View) AS Detail_View,
        SUM(pl.Comment) AS Comment,
        (SELECT pi.Image_Src FROM Post_Image pi WHERE pi.Post_ID = pl.Post_ID LIMIT 1) AS Image_Src
    FROM Post_Log pl
    WHERE pl.User_ID = ?
      AND YEAR(pl.Log_Date) = YEAR(CURDATE())
      AND MONTH(pl.Log_Date) = MONTH(CURDATE())
    GROUP BY pl.Post_ID
) AS Cur ON p.Post_ID = Cur.Post_ID
LEFT JOIN (
    SELECT 
        pl.Post_ID,
        SUM(pl.Feed_Like) AS Feed_Like,
        SUM(pl.View) AS View,
        SUM(pl.Detail_View) AS Detail_View,
        SUM(pl.Comment) AS Comment
    FROM Post_Log pl
    WHERE pl.User_ID = ?
      AND YEAR(pl.Log_Date) = YEAR(CURDATE() - INTERVAL 1 MONTH)
      AND MONTH(pl.Log_Date) = MONTH(CURDATE() - INTERVAL 1 MONTH)
    GROUP BY pl.Post_ID
) AS Pre ON p.Post_ID = Pre.Post_ID
ORDER BY p.Post_ID DESC

      `,
      [User_ID, User_ID]
    );
    // ("http://triptracks.co.kr/imgserver/");
    const Post_Log_List = [];
    await Now_Month_Info_Log.forEach(async (element) => {
      const Post = {
        Post_ID: element.Post_ID,
        Post_Title: element.Post_Title,
        Post_Caption: element.Post_Caption,
        Image_Src: "http://triptracks.co.kr/imgserver/" + element.Image_Src,
        Post_Create_Timestamp: element.Post_Create_Timestamp,
        Post_Edit_Timestamp: element.Post_Edit_Timestamp,
        Diff_Feed_Like: element.Cur_Feed_Like - element.Pre_Feed_Like,
        Diff_View: element.Cur_View - element.Pre_View,
        Diff_Detail_View: element.Cur_Detail_View - element.Pre_Detail_View,
        Diff_Comment: element.Cur_Comment - element.Pre_Comment,
      };
      await Post_Log_List.push(Post);
    });

    Post_Log_List.sort((a, b) => {
      if (Type === "View") return b.Diff_View - a.Diff_View;
      if (Type === "Detail_View") return b.Diff_Detail_View - a.Diff_Detail_View;
      if (Type === "Like") return b.Diff_Feed_Like - a.Diff_Feed_Like;
      if (Type === "Comment") return b.Diff_Comment - a.Diff_Comment;

      return b.Post_ID - a.Post_ID;
    });

    return res.status(200).json({
      Post_Log_List,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "앰버서더 점수 설정 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
