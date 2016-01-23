var mongoose = require('mongoose');

var lineGraphSchema = mongoose.Schema({
  line: [{nodes: [{x: Number, y: Number}], color: String}],
});

module.exports = mongoose.model('LineGraph', lineGraphSchema);