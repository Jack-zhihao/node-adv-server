var express = require('express');
var router = express.Router();
var advertModel = require('../mongodb/model/advert')
var { MD5 } = require('../utils/utils')
var { verifyToken } = require('../utils/tokens')
var jutils = require('jutils-src')


router.post('/editAdvert', function (req, res) {
  let { userid, advertId, advertTitle, advertDec, advertWechats } = req.body
  const { authorization } = req.headers;

  verifyToken(userid, authorization).then(tokenStatus => {
    if (tokenStatus === 0) return res.send({ data: {}, message: '用户验证失败，请重新登陆', code: 0 });
    if (tokenStatus === 2) return res.send({ data: {}, message: '用户登录已过期，请重新登陆', code: 2 });

    console.log({ userid, advertId, advertTitle, advertDec, advertWechats })
    
    const updateTime = jutils.formatDate(new Date(), "YYYY-MM-DD HH:ii:ss") // 更新时间
    if (!!advertId) {
      advertModel.findOneAndUpdate({ advertId }, { advertTitle, advertDec, advertWechats, updateTime }, function (e, re_up) {
        res.send({ data: {}, message: '操作成功', code: 1 })
      })

    } else {
      advertId = MD5(String(new Date().getTime()))
      advertModel.create({ userid, advertId, advertTitle, advertDec, advertWechats, updateTime }, function (e, re_up) {
        res.send({ data: {}, message: '操作成功', code: 1 })
      })
    }
  })

});

router.post('/findAdverts', function (req, res) {
  let { userid, current, pageSize } = req.body;
  current = Number(current)
  pageSize = Number(pageSize)
  const { authorization } = req.headers;
  verifyToken(userid, authorization).then(tokenStatus => {

    if (tokenStatus === 0) return res.send({ data: {}, message: '用户验证失败，请重新登陆', code: 0 });
    if (tokenStatus === 2) return res.send({ data: {}, message: '用户登录已过期，请重新登陆', code: 2 });

    advertModel.find({ userid }, function (err, ress) {
      if (err) return res.send({ data: {}, message: '服务起无响应', code: 0 });

      const allTotal = ress.length;
      advertModel.find({ userid }).skip((current - 1) * pageSize).limit(pageSize).sort('field -uploadDate').exec(function (err, data) {
        let data_ = [];
        data.map((d, idx) => {
          const uploadDate = jutils.formatDate(new Date(d.uploadDate), "YYYY-MM-DD HH:ii:ss")
          const updateTime = d.updateTime ? jutils.formatDate(new Date(d.updateTime), "YYYY-MM-DD HH:ii:ss") : null
          data_.push({
            key: idx,
            userid: d.userid,
            advertId: d.advertId,
            advertTitle: d.advertTitle,
            advertDec: d.advertDec,
            advertWechats: d.advertWechats,
            updateTime,
            uploadDate
          })
        })
        res.send({ data: data_, message: '请求成功', code: 1, total: allTotal, current, pageSize })
      })
    })
  })
})

router.post('/findDelete', function (req, res) {
  const { authorization } = req.headers;
  const { advertId, userid } = req.body;
  verifyToken(userid, authorization).then(tokenStatus => {

    if (tokenStatus === 0) return res.send({ data: {}, message: '用户验证失败，请重新登陆', code: 0 });
    if (tokenStatus === 2) return res.send({ data: {}, message: '用户登录已过期，请重新登陆', code: 2 });

    advertModel.deleteOne({advertId, userid}, function(err, data) {
      if(err) return res.send({ data: {}, message: '服务无响应', code: 2 });
      res.json({ data: {}, message: '操作成功', code: 1 });
    })
  })
})

router.get('/getAdvertWxs', function (req, res) {

  const {advertId} = req.query;
  if(!advertId) return res.send({ data: {}, message: 'advertId不能为空', code: 0 });

  advertModel.findOne({advertId}, function (err, data) {

    if(err) return res.send({ data: {}, message: '服务无响应', code: 0 });
    if(!data) return res.send({ data: {}, message: 'advertId错误', code: 0 });

    const advertWechats = data.advertWechats.split(',')
    res.json({ data: advertWechats, message: '请求成功', code: 1 });

  })
})

module.exports = router;