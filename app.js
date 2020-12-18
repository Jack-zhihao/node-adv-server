var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var fileupload = require("express-fileupload");
var busboy = require('connect-busboy');
var app = express();
require('./mongodb/db')
var setRoute = require('./common/export-app')

app.use(fileupload());
// parse application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({ extended: false }))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(busboy())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const allowHeaders = "Origin, Expires, Content-Type, X-E4M-With, x-requested-with, Authorization";
app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许人员域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", allowHeaders);
  //允许的header类型
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  // res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", 'Express');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})

setRoute(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
