var express = require("express");
var router = express.Router();

router.post("/", () => {});
router.use("/Img_save", require("./Img_save.js"));
router.use("/Img_send", require("./Img_send.js"));
router.use("/Post_save", require("./Post_save.js"));

module.exports = router;
