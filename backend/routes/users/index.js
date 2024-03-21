var express = require("express");
var router = express.Router();

router.post("/", () => {});
router.use("/Login", require("./Login.js"));
router.use("/SignUp", require("./SignUp.js"));
router.use("/TagSetup", require("./TagSetup.js"));
router.use("/Check_Email",require("./Check_Email.js"));

module.exports = router;
