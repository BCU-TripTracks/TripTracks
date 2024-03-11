var express = require("express");
var router = express.Router();
const pool = require("../../utils/DBconn");

router.post("/", async (req, res, next) => {
  const { User_Email, Tags } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();

    var SelectUser = await conn.query("SELECT * FROM User_Info WHERE User_Email = ?", [User_Email]);
    if (SelectUser.length == 0)
      return res.status(400).send({ Result: "Fail", Error: "NotExistEmail", Message: "존재하지 않는 사용자" });
    else {
      const User_ID = SelectUser[0].User_ID;
      var selectTags = await conn.query("SELECT * FROM User_Tags WHERE User_ID = ?", [User_ID]);
      if (selectTags.length > 0) conn.query("DELETE FROM User_Tags WHERE User_ID = ?", [User_ID]);

      await Tags.forEach(async (element) => {
        await conn.query("INSERT INTO User_Tags (User_ID, User_Tag) VALUES (?, ?)", [User_ID, element]);
      });

      return res.status(201).send({ Result: "Success", Message: "태그 설정 완료" });
    }
  } catch (error) {
    return res.status(500).send({ Result: "Fail", Error: error });
  }
});

module.exports = router;
