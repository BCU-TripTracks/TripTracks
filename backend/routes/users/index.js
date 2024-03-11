var express = require('express');
var router = express.Router();

router.post('/', ()=>{

});
router.use('/Login', require("./Login.js"));
router.use('/SignUp', require("./SignUp.js"));
router.use('/LifeThemeSetup', require("./LifeThemeSetup.js"));

module.exports = router;
