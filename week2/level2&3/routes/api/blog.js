const router = require('express').Router();

router.get('/post', (req, res) => {
    res.send('api blog post');
});

module.exports = router;