var express = require("express");
var router = express.Router();

router.post("/", () => {});
router.use("/follow", require("./follow.js"));
router.use("/print_follow", require("./print_follow.js"));
router.use("/search", require("./search.js"));
router.use("/profile_change", require("./profile_change.js"));

module.exports = router;
