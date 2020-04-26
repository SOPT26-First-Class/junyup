const router = require('express').Router();

router.get('/login', (req, res) => {
    res.send('api users login');
});

router.get('/signup', (req, res) => {
    res.send('api users signup');
});

module.exports = router;