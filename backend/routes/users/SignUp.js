/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.03.12.
 * 코드 설명:
 * 사용자 회원 가입을 위한 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");

router.post("/", async (req, res, next) => {
  const { user_Email, user_Passwd, user_Name } = req.body;

  let conn;
  try {
    conn = await DBconn.getConnection();
    const inputInfo = await conn.query("INSERT INTO User_Info (User_Email, User_Pwd, User_Name) VALUES (?, ?, ?)", [user_Email, user_Passwd, user_Name]); 
    return res.json({message: 'success'});
  }catch (err){
    if(err= ' ER_DUP_ENTRY')return res.json({err: 'ER_DUP_ENTRY'});
    console.log(err);
    res.status(401).json({message:'오류가 발생했습니다.'});
    return;
  }
});
module.exports = router;