var express = require("express");
var router = express.Router();

router.post("/", () => {});
router.use("/Post_save", require("./Post_save.js"));
router.use("/Posts_list", require("./Posts_list.js"));
router.use("/Post_detail", require("./Post_detail.js"));
router.use("/Post_delete", require("./Post_delete.js"));
router.use("/searching_tab", require("./searching_tab.js"));
router.use("/Post_modify", require("./Post_modify.js"));
router.use("/Comment", require("./Comment.js"));
router.use("/Comment_Like", require("./Comment_Like.js"));
router.use("/SubComment", require("./SubComment.js"));
router.use("/SubComment_Like", require("./SubComment_Like.js"));
router.use("/Like", require("./Like.js"));
router.use("/Comments_list", require("./Comments_list.js"));
router.use("/Popular", require("./Popular.js"));
router.use("/Following_tab", require("./Following_tab.js"));
router.use("/Post_Store", require("./Post_Store.js"));
router.use("/Ambass_Save_List", require("./Ambass_Save_List.js"));
router.use("/Save_List", require("./Save_List.js"));
router.use("/Post_DM_Send", require("./Post_DM_Send.js"));
router.use("/Post_tinyInfo", require("./Post_tinyInfo.js"));
router.use("/Planning", require("./Planning.js"));
router.use("/Plan_delete", require("./Plan_delete.js"));
router.use("/my_plan", require("./my_plan.js"));
router.use("/my_plan_detail", require("./my_plan_detail.js"));

module.exports = router;
