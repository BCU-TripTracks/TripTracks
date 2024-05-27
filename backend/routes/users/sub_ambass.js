var express = require("express");
var router = express.Router();
const pool = require("../../utils/DBconn");

router.get("/", async (req, res, next) => {
  const { User_ID } = req.session;
  if (!User_ID) return res.status(200).json({ success: false, msg: "로그인이 필요합니다." });

  let conn;
  try {
    conn = await pool.getConnection();
    const updated = await conn.query(`UPDATE User_Info SET User_Rule=? WHERE User_ID=?`, [1, User_ID]);
    if (!updated.affectedRows) return res.status(200).json({ success: false, msg: "권한 변경 실패" });
    const abassInfo_Insert = await conn.query(
      `INSERT INTO Ambass_Info_Log (User_ID, Year, Month) 
       VALUES (?, YEAR(NOW()), MONTH(NOW())) 
       ON DUPLICATE KEY UPDATE User_ID = User_ID`,
      [User_ID]
    );
    if (!abassInfo_Insert.affectedRows) return res.status(200).json({ success: false, msg: "앰버서더 등록 실패" });
    return res.status(200).json({ success: true, msg: "앰버서더 등록 성공" });
  } catch (error) {
    console.log("DB 접속 에러");
    return res.status(500).json({ success: false, msg: "DB 접속 에러" });
  } finally {
    if (conn) conn.end();
    console.log("DB 연결 해제");
  }
});

module.exports = router;
