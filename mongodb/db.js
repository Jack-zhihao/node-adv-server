var mongoose = require('mongoose');

mongoose.connect('mongodb://39.107.248.255:27017/zhihao_dev');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    console.log("数据库成功连接");
});