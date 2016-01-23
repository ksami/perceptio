var Models = require('../models');
var respond = require('./apiResponse');
var Validator = require('../middleware/validator');
var draw = require('../draw');

var FormController = {

  // POST /form
  create: (req, res, next)=>{
    var match = Validator.isLineGraph(req.body);
    
    if(!match.result){
      res.send(respond(null, match.error));
      next();
    }
    else{
      draw('lineGraph', function(img){
        res.set('Content-Type', 'image/png');
        res.set('Content-Length', img.length);
        res.send(img);
        next();
      });

    }
  }

};

module.exports = FormController;