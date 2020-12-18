var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var advertRouter = require('../routes/advert');
var commonRouter = require('../routes/common');

module.exports = (app) =>{
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/advert', advertRouter);
  app.use('/common', commonRouter);
}
