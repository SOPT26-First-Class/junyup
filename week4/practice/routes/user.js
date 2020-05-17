const express = require('express');
const router = express.Router();
const User = require('../models/user');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const crypto = require('crypto');

router.post('/signup', async (req, res) => {
    const { id, name, password, email } = req.body;
    // request data 확인 - 없다면 Bad Request 반환
    if (!id || !name || !password || !email) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    // MISSION DB에서 id의 값을 가진 사용자가 있는지 확인하기
    if (await User.checkUser(id)) return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.ALREADY_ID));
        
    // if (User.filter(user => user.id == id).length > 0) {
    //     res.status(statusCode.BAD_REQUEST)
    //         .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    //     return;
    // }

    const salt = crypto.randomBytes(32).toString('hex');
    const hash = (await crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512')).toString('hex')
    const idx = await User.signup(id, name, hash, salt, email);
    if (idx == -1) {
        return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, {userId: id}));
});

/* 
    ✔️ sign in
    METHOD : POST
    URI : localhost:3000/user/signin
    REQUEST BODY : id, name
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User ID
*/
router.post('/signin', async (req, res) => {
    // request body 에서 데이터 가져오기
    const { id, password } = req.body;

    // request data 확인 - 없다면 Null Value 반환
    if (!id || !password) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if (!(await User.checkUser(id))) return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.NO_USER));
    
    const user = await User.getUserById(id);
    console.log(user);
    const hash = (await crypto.pbkdf2Sync(password, user.salt, 1, 32, 'sha512')).toString('hex');

    // 비밀번호 확인 - 없다면 Miss match password 반환
    if (user.password !== hash ) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
        return;
    }
    // 성공 - login success와 함께 user Id 반환
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userId: id}));
});

module.exports = router;