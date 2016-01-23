var mongoose = require('mongoose');

var timeGraphSchema = mongoose.Schema({
  lines: [{nodes: [{time: String, value: Number}], color: String}],
});

module.exports = mongoose.model('timeGraph', timeGraphSchema);