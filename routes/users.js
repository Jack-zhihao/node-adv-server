var express = require('express');
var router = express.Router();
var userInfoModel = require('../mongodb/model/user')
var { hash, compare, MD5 } = require('../utils/utils')
var { sign } = require('../utils/tokens')
var { verifyToken } = require('../utils/tokens')

router.get('/', function (req, res) {
  res.send('respond with a resource');
});

/**
 * @title 注册
 * @params username: 用户名, password: 密码 
 * @dec 暂无
 * */
router.post('/register', function (req, res) {
  const { username, password } = req.body;

  userInfoModel.findOne({ username }, function (err, data) {
    if (err) return res.send(err)
    if (data) return res.send({ data: {}, message: '用户名已存在', code: 0 })

    hash(password).then(decry => {
      const userid = MD5(`wx-${password}${new Date().getTime()}`)
      userInfoModel.create({ username, password: decry, userid })
    })

    res.send({ data: {}, message: '注册成功', code: 1 })
  })
})

/**
 * @title 登录
 * @params username: 用户名, password: 密码 
 * @dec 
 * */
router.post('/login', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  const { username, password } = req.body;
  userInfoModel.findOne({ username }, function (err, data) {
    if (err) return res.send({ data: {}, message: err, code: 0 })
    if (!data) return res.send({ data: {}, message: '你输入的用户名不存在', code: 0 })

    const $data = data;
    compare(password, $data.password).then(re => {
      if (!re) return res.send({ data: {}, message: '您输入的密码错误', code: 0 })

      const token = sign(username + new Date().getTime())
      userInfoModel.findOneAndUpdate({ username }, { token }, function (err) {
        if (err) return console.log('err', err) 
        res.json({
            data: {
              token,
              username: $data.username,
              userid: $data.userid
            },
            message: '登录成功',
            code: 1
          })
      })
    })
  })
})

router.post('/logout', function(req, res) {
  const { authorization } = req.headers;
  const { userid } = req.body;
  verifyToken(userid, authorization).then(tokenStatus => {

    if (tokenStatus === 0) return res.send({ data: {}, message: '用户验证失败，请重新登陆', code: 0 });
    if (tokenStatus === 2) return res.send({ data: {}, message: '用户登录已过期，请重新登陆', code: 2 });

    userInfoModel.findOneAndUpdate({userid}, {token: null}, function(err, data) {
      if(err) return res.send({ data: {}, message: '服务器无响应', code: 0 })
      
      res.json({ data: {}, message: '退出成功', code: 1 })
    })

  })
})

module.exports = router;
