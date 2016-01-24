var mongoose = require('mongoose');

var realtimeGraphSchema = mongoose.Schema({
  url: String,
  duration: Number,
  size: {width: Number, height: Number},
  color: String
});

module.exports = mongoose.model('RealtimeGraph', realtimeGraphSchema);