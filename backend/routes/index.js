var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/users", require("./users/index.js"));
router.use("/feeds", require("./feeds/index.js"));
router.use("/profile", require("./profile/index.js"));
router.use("/direct", require("./direct/index.js"));
router.use("/ambassador", require("./ambassador/index.js"));

module.exports = router;
