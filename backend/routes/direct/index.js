var express = require("express");
var router = express.Router();

router.post("/", () => {});
router.use("/send_Message", require("./send_message.js"));
router.use("/print_Room", require("./print_Room.js"));
router.use("/print_DM", require("./print_DM.js"));
router.use("/make_room", require("./make_room.js"));

module.exports = router;
