var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * 
*/
var resourceSchema = new Schema({
  router: String,
  routerid: String,
  isShow: Boolean,
  key: String,
  
})