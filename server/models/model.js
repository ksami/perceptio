var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    name: Number
});

module.exports = mongoose.model('Model', modelSchema);