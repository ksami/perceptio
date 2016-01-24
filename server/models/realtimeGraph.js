var mongoose = require('mongoose');

var realtimeGraphSchema = mongoose.Schema({
  url: String,
  duration: String,
  width: String,
  height: String,
  color: String
});

module.exports = mongoose.model('RealtimeGraph', realtimeGraphSchema);