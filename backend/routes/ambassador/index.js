var express = require("express");
var router = express.Router();

router.post("/", () => {});
router.use("/Setup_TopNav", require("./Setup_TopNav.js"));
router.use("/Setup_Score", require("./Setup_Score.js"));
router.use("/Setup_Follower", require("./Setup_Follower.js"));
router.use("/Setup_View", require("./Setup_View.js"));
router.use("/Setup_Detail_View", require("./Setup_Detail_View.js"));
router.use("/Setup_Like", require("./Setup_Like.js"));
router.use("/Setup_Comment", require("./Setup_Comment.js"));
router.use("/Search_Summation", require("./Search_Summation.js"));
router.use("/Detail", require("./Detail.js"));
router.use("/Post_save", require("./Post_save.js"));

module.exports = router;
