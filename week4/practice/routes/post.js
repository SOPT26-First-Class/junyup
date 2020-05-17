const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const { getPostById } = require('../models/post');



router.get('/', async (req, res) => {
    try {
        let result;
        if (!req.query.uid) result = await Post.getPosts();
        else result = await Post.getPostsByUserId(req.body.uid);

        return res.status(statusCode.OK).send(util.success(statusCode.OK, "success read", { result: posts }));
    } catch(e) {
        return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, 'DB error'));
    }
});


// get post by user id
router.get('/:id', async (req, res) => {
    try {
        const result = await Post.getPostById(req.params.id);
        if (!result) return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, 'DB ERROR'));
        return res.status(statusCode.OK).send(util.success(statusCode.OK, "success read", { result: post }));
    } catch(e) {
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, 'DB error'));
    }
});

router.post('/', async (req, res) => {    
    const {uid, title, contents} = req.body;
    if(!uid || !title || !contents) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    try {
        const result = await Post.create(uid, title, contents);
        res.status(statusCode.OK).send(util.success(statusCode.OK, "success posting", { result }));
    } catch(e) {
        res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, 'DB error'));
    }
});

router.put('/:id', async (req, res) => {
    try {

        const post = await Post.getPostById(req.params.id);
        // id에 해당하는 post 없음
        if (post === -1) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));

        // 변경된 값이 하나도 경우
        if (Object.keys(req.body).length === 0) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        
        const res = await Post.update(req.params.id, req.body);
        res.status(statusCode.OK).send(util.success(statusCode.OK, "success update", { id }));
    } catch(e) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, 'DB UPDATE FAIL'));
    }
});

router.delete('/:id/:uid', async (req, res) => {
    try {
        const post = await Post.getPostById(req.params.id);
        if (!post) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
        if (post.userIdx !== req.params.uid) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
        const result = await Post.delete(req.params.id, req.params.uid);
        res.status(statusCode.OK).send(util.success(statusCode.OK, "success delete", { result }));
    } catch(e) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, 'DELETE FAIL'));
    }
});