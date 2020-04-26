const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.get('/', (req, res) => {
    res.render('index', {title: 'express'});
});

router.use('/api', apiRouter);

module.exports = router;