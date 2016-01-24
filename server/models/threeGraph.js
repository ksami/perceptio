var mongoose = require('mongoose');

var threeGraphSchema = mongoose.Schema({
  points: [{
    x: Number,
    y: Number,
    z: Number,
    color: String
  }],
});

module.exports = mongoose.model('ThreeGraph', threeGraphSchema);