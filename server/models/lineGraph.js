var mongoose = require('mongoose');

var lineGraphSchema = mongoose.Schema({
  size: {width: Number, height: Number},
  lines: [{nodes: [{x: Number, y: Number}], color: String}],
});

module.exports = mongoose.model('LineGraph', lineGraphSchema);