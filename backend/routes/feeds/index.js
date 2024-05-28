var express = require("express");
var router = express.Router();

router.post("/", () => {});
router.use("/Post_save", require("./Post_save.js"));
router.use("/Posts_list", require("./Posts_list.js"));
router.use("/Post_detail", require("./Post_detail.js"));
router.use("/Post_delete", require("./Post_delete.js"));
router.use("/searching_tab", require("./searching_tab.js"));
router.use("/Post_modify", require("./Post_modify.js"));

module.exports = router;
