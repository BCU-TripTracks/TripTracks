var express = require("express");
var router = express.Router();

router.post("/", () => {});
router.use("/Login", require("./Login.js"));
router.use("/SignUp", require("./SignUp.js"));
router.use("/TagSetup", require("./TagSetup.js"));
router.use("/Check_Email",require("./Check_Email.js"));
router.use("/Top_Tags", require("./Top_Tags.js"));
router.use("/Top_Post", require("./Top_Post.js"));
router.use("/Direct_Message", require("./Direct_Message.js"));
module.exports = router;
