/***
 * 코드 최초 작성자 : 이영재
 * 코드 최초 작성일 : 2024.05.28.
 * 코드 설명:
 * 앰버서더 페이지에서 사용되는 Top Navigation Bar 설정 API 스크립트
 */

const express = require("express");
const router = express.Router();
const pool = require("../../utils/DBconn");

// DM_Room 생성 API
router.use("/", async (req, res) => {
  const { User_ID } = req.session;
  if (!User_ID) return res.status(200).json({ success: false, msg: "로그인이 필요합니다." });

  let conn;
  try {
    conn = await pool.getConnection();
    let [User_Info] = await conn.query("SELECT * FROM User_Info WHERE User_ID=?", [User_ID]);
    if (!User_Info) return res.status(200).json({ success: false, msg: "사용자 정보를 찾을 수 없습니다." });
    if (User_Info.User_Rule !== 1) return res.status(200).json({ success: false, msg: "권한이 없습니다." });
    return res.status(200).json({
      success: true,
      User_Info: {
        User_ID: User_Info.User_ID,
        User_Name: User_Info.User_Name,
        Profile_Img: `http://triptracks.co.kr/imgserver/${User_Info.Profile_Img}`,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DM Room 생성 중 오류가 발생했습니다." });
  }
});

module.exports = router;
