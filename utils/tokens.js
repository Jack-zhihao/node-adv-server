const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const userInfoModel = require('../mongodb/model/user')
// 生成token方法
exports.sign = (payload) => {
  var privateKey = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_private.key'));
  var token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
  return token
}

// 验证token方法
exports.verify = (token) => {
  var cert = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_public.key'));  // get public key
  return new Promise(resolve => {
    jwt.verify(token, cert, function (err, decoded) {
      resolve(decoded)
    })
  })
}

// 全局工具：验证token是否失效
exports.verifyToken = (userid, token) => {
  var cert = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_public.key'));  // get public key
  return new Promise(resolve => {

    const text = jwt.verify(token, cert, (err, decoded) => decoded)
    if (!!text) {

      userInfoModel.findOne({ userid }, function (err, data) {
        if (err) console.log(err);
        console.log('data', data)
        const $token = data.token;
        if (token === $token) {
          // token正常
          resolve(1)
        } else {
          // token过期
          resolve(2)
        }

      })
    } else {
      // token错误
      resolve(0)
    }
  })
}
