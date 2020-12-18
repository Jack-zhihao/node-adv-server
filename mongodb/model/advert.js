var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * @title 广告微信号表：
 * @params {
 *  userid: 用户id
 *  advertId: 广告id
 *  advertTitle: 广告title
 *  advertDec: 广告描述
 *  advertWechats: 广告微信（数组）
 * } 
*/
var wechatSchema = new Schema({
  userid: String,
  advertId: String,
  advertTitle: String,
  advertDec: String,
  advertWechats: String,
  updateTime: {type: Date},
  uploadDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Advert', wechatSchema)
