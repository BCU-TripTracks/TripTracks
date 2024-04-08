var express = require("express");
var router = express.Router();

router.post("/", () => {});
router.use("/img_save", require("./Img_save.js"));

module.exports = router;
