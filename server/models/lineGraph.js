var mongoose = require('mongoose');

var lineGraphSchema = mongoose.Schema({
  lines: [{nodes: [{x: Number, y: Number}], color: String}],
});

module.exports = mongoose.model('LineGraph', lineGraphSchema);