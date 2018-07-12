var mongoose = require('mongoose');


var watchSchema = mongoose.Schema({
  brand: String,
  model: String,
  image: String,
  description: String
});

var Watch = mongoose.model("Watch", watchSchema);


module.exports = Watch;