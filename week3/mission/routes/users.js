var express = require('express');
var router = express.Router();

const {util, statusCode, responseMessage} = require('../modules');

const fs = require('fs');
const crypto = require('crypto');

const getSalt = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/signup', async (req, res) => {
  const {id, name, password, email} = req.body;
  if (!id || !name || !password || !email) {
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  try {
    const users = JSON.parse(await fs.readFileSync('./models/user.txt'));
    if (users.filter(u => u.id === id).length > 0) {
      return res.status(statusCode.BAD_REQUEST).send(util.success(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
    }
    const salt = getSalt(32);
    const hash = (await crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512')).toString('hex');
    users.push({id, name, email, hash, salt});
    await fs.writeFileSync('./models/user.txt', JSON.stringify(users));
    res.status(statusCode.OK).send(util.success(statusCode.OK, 'signup!', {'userId': id}));
  } catch(e) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, '파일 읽기/작성 오류'));
  }
});

router.post('/signin', async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  try {
    const users = JSON.parse(await fs.readFileSync('./models/user.txt'));
    const user = users.filter(u => u.id === id)[0];
  
    if (!user) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    const hash = (await crypto.pbkdf2Sync(password, user.salt, 1, 32, 'sha512')).toString('hex');
    if (user.hash !== hash) {
      return res.status(statusCode.BAD_REQUEST)
        .send((util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW)));
    }

    res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {'userId': id}));
  } catch(e) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, '파일 읽기 오류'));
  }
});

router.get('/profile/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const users = JSON.parse(await fs.readFileSync('./models/user.txt'));
    const user = users.filter(u => u.id === id)[0];
    if (!user) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_PROFILE_SUCCESS, {'userID': id}));
  } catch(e) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, '파일 읽기 오류'));
  }
});


module.exports = router;
