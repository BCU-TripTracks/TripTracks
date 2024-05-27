var express = require("express");
var router = express.Router();
const pool = require("../../utils/DBconn");

router.use("/", async (req, res, next) => {
  const { User_ID } = req.session;
  if (!User_ID) return res.status(501).json({ success: false, msg: "로그인이 필요합니다." });
  let conn;
  try {
    conn = await pool.getConnection();
    let [User_Info] = await conn.query("SELECT User_Rule FROM User_Info WHERE User_ID=?", [User_ID]);
    if (!User_Info) return res.status(501).json({ success: false, msg: "사용자 정보를 찾을 수 없습니다." });
    if (User_Info.User_Rule !== 1) return res.status(501).json({ success: false, msg: "권한이 없습니다." });
    let [Now_Month_Info_Log] = await conn.query(
      "SELECT View FROM Ambass_Info_Log WHERE User_ID=? AND Year=YEAR(NOW()) AND Month=MONTH(NOW())",
      [User_ID]
    );
    if (!Now_Month_Info_Log) return res.status(501).json({ success: false, msg: "앰버서더 정보를 찾을 수 없습니다." });
    let [Last_Month_Info_Log] = await conn.query(
      `SELECT View FROM Ambass_Info_Log WHERE User_ID=? AND 
    (Year = YEAR(DATE_SUB(NOW(), INTERVAL 1 MONTH)) AND Month = MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH)))`,
      [User_ID]
    );
    return res.status(200).json({
      View_Info: {
        Now_View: Now_Month_Info_Log.View,
        Last_View: Last_Month_Info_Log ? Last_Month_Info_Log.View : 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "앰버서더 점수 설정 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.end();
  }
});

module.exports = router;
