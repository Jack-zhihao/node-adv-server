var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * @title 广告预览数据表
 * @params {
 *  advertViewId: 预览广告id
 *  advertViewTitle: 预览广告名称
 *  advertViewDec: 预览广告描述
 *  advertVidwImg: 预览广告图片(base64)
 *  uploadDate: 上传时间
 *  updateTime: 更新时间
 * }
*/
const AdvertViewSchema = new Schema({
    advertViewId: String,
    advertViewTitle: String,
    advertViewDec: String,
    advertVidwImg: String,
    uploadDate: {type: Date, default: Date.now},
    updateTime: {type: Date},
})

module.exports = mongoose.model('advertView', AdvertViewSchema)