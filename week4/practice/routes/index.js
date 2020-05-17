var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/user', require('./post'));

module.exports = router;
