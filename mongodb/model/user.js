var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * @title 用户信息表
 * @params {
 *  username: 用户名,
 *  password: 加密密码
 *  phone: 手机号
 *  userid: 用户id
 *  token: token
 *  sex: 性别
 *  age: 年龄
 *  describe: 描述,
 *  uploadDate: 创建日期
 * }
*/
var userSchema = new Schema({
  username: String,
  password: String,
  phone: String,
  userid: String,
  token: String,
  sex: String,
  age: Number,
  uploadDate: {type: Date, default: Date.now},
  describe: String
})

module.exports = mongoose.model('userInfo', userSchema)
