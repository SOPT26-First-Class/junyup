var express = require('express');
var router = express.Router();

const usersRouter = require('./users');
const postRouter = require('./post');

router.use('/users', usersRouter);
router.use('/post', postRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
