var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * @title 图片资源表：
 * @params {
 *  fileTitle: 文件id
 *  fileUrl: 文件地址
 *  fileSize: 文件大小
 *  fileType: 文件类型
 * } 
*/
var commonFileSchema = new Schema({
  fileTitle: String,
  fileUrl: String,
  fileSize: String,
  fileType: String,
  uploadDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model('commonFile', commonFileSchema)
