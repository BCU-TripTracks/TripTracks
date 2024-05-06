var express = require("express");
var router = express.Router();

router.post("/", () => {});
router.use("/follow", require("./follow.js"));
router.use("/unfollow", require("./unfollow.js"));
router.use("/print_follow", require("./print_follow.js"));
router.use("/search", require("./search.js"));
router.use("/profile_change", require("./profile_change.js"));
router.use("/usersFind", require("./usersFind.js"));
router.use("/posts_list", require("./Posts_list.js"));

module.exports = router;
