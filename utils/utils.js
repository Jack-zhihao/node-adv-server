const bcrypt = require('bcrypt')
const JSMD5 = require("js-md5")
/**
 * @title 加密
 * @params myPlaintextPassword: 密码明文
 * @dec 
 */
exports.hash = (plaintextPassword) => {
  const saltRounds = 10;
  return new Promise(resolve => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(plaintextPassword, salt, function(err, hash){
        resolve(hash)
      })
    })
  })
} 

/**
 * @title 对比
 * @params myPlaintextPassword: 密码明文 hash：对比密码
 * @dec 
 */
exports.compare = (myPlaintextPassword, hash) => {
  return new Promise(resolve => {
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
      resolve(result)
    })
  })
}

/**
 * @title MD5加密
 * @params myPlaintextPassword: 明文
 * @dec
*/
exports.MD5 = (myPlaintextPassword) => {
  return JSMD5(myPlaintextPassword)
}