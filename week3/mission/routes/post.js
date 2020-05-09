const express = require('express');
const router = express.Router();
const { util, responseMessage, statusCode } = require('../modules');
const fs = require('fs');

// 로그인 됐다는 가정,,

router.get('/', async (req, res) => {
    try {
        const posts = JSON.parse(await fs.readFileSync('./models/post.txt'));
        res.status(statusCode.OK).send(util.success(statusCode.OK, "success read", { result: posts }));
    } catch(e) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, '파일 읽기 실패'));
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = JSON.parse(await fs.readFileSync('./models/post.txt')).filter(p => p.id === req.id);
        res.status(statusCode.OK).send(util.success(statusCode.OK, "success read", { result: post }));
    } catch(e) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, '파일 읽기 실패'));
    }
});


router.post('/', async (req, res) => {    
    const {id, uid, title, contents} = req.body;
    if(!id || !uid || !title || !contents) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    try {
        const posts = JSON.parse(await fs.readFileSync('./models/post.txt'));
        if (posts.filter(p => p.id === id).length) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE)); 
        posts.push({id, uid, title, contents});
        await fs.writeFileSync('./models/post.txt', JSON.stringify(posts));
        res.status(statusCode.OK).send(util.success(statusCode.OK, "success posting", { id }));
    } catch(e) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, '파일 수정 실패'));
    }
});

router.put('/:id', async (req, res) => {
    try {
        const posts = JSON.parse(await fs.readFileSync('./models/post.txt'));
        const index = posts.findIndex(post => post.id === req.params.id);
        if (index === -1) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
        const {id, uid, title, contents} = req.body;
        if (!id || !uid || !title || !contents) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        posts[index] = req.body;
        await fs.writeFileSync('./models/post.txt', JSON.stringify(posts));
        res.status(statusCode.OK).send(util.success(statusCode.OK, "success update", { id }));
    } catch(e) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, '파일 수정 실패'));
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const posts = JSON.parse(await fs.readFileSync('./models/post.txt'));
        const index = posts.findIndex(post => post.id === req.params.id);
        if (index === -1) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
        posts.splice(index, 1);
        await fs.writeFileSync('./models/post.txt', JSON.stringify(posts));
        res.status(statusCode.OK).send(util.success(statusCode.OK, "success delete", { id: req.params.id }));
    } catch(e) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, '파일 수정 실패'));
    }
});

module.exports = router;