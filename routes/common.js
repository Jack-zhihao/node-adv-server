var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var commonFileModel = require('../mongodb/model/common/upload')
const {baseUrl, env} = require('../utils/config')

router.post('/uploadFile', function (req, res, next) {
  console.log(req); // 上传的文件信息
  const file = req.files.file;
  const fileType = file.name.substring(file.name.lastIndexOf('.')+1);
  const fileName = `${new Date().getTime()}.${fileType}`
  fs.writeFile(`./upload_tmp/${fileName}`, file.data, 'utf-8', function (err) {
    if (err) return res.send({ message: '上传失败,请重试', code: 0 })
    console.log('写入成功');
    res.json({
      data: {
        coverUrl:  path.resolve(__dirname, '..')+ `/upload_tmp/${fileName}`
      },
      message: '上传成功',
      code: 1 
    })
  })
})

module.exports = router;
