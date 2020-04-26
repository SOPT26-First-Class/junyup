const express = require('express');
const router = express.Router();
const blogRouter = require('./blog');
const userRouter = require('./users');

router.use('/blog', blogRouter);
router.use('/users', userRouter);

module.exports = router;