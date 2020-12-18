var express = require('express');
var router = express.Router();
var fs = require('fs')
const multiparty = require('multiparty');

// var advertViewModel = require('../mongodb/model/advertView');
// var commonFileModel = require('../mongodb/model/common/upload');
// var { MD5 } = require('../utils/utils')
// var { verifyToken } = require('../utils/tokens')
// var jutils = require('jutils-src')

router.post('/uploadFile', function (req, res) {

  let form = new multiparty.Form();
  
  form.encoding = 'utf-8';
  
  form.uploadDir = './tmplFile';

  // form.maxFilesSize = 1 * 1024 * 1024;

  form.parse(req, function(err, fileds, files) {
    
    console.log('req', req, 'err', err, 'fileds', fileds, 'files', files)
    res.send({data:{}, message: '上传成功！', code: 1});
    try {
      let inputFile = files.file[0];
      let uploadedPath = inputFile.path;
      console.log('uploadedPath', uploadedPath)
      let newPath = form.uploadDir + "/" + inputFile.originalFilename;
      //同步重命名文件名 fs.renameSync(oldPath, newPath)
      fs.renameSync(inputFile.path, newPath);
      res.send({data:{}, message: '上传成功！', code: 1});
      // //读取数据后 删除文件
      // fs.unlink(newPath, function () {
      //   console.log("删除上传文件");
      // })
    } catch (err) {
      console.log(err);
      res.send({data:{}, message: '上传失败！', code: 0});
    }
  })
})


module.exports = router;
