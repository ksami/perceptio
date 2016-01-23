var Models = require('../models');
var respond = require('./apiResponse');
var Validator = require('../middleware/validator');

var FormController = {

  // POST /form
  create: (req, res, next)=>{
    var match = Validator.isLineGraph(req.body);
    
    if(!match.result){
      res.send(respond(null, match.error));
    }
    else{
      var lineGraph =  new Models.LineGraph(req.body);
      lineGraph.save()
      .then(function(model){
        console.log(model);
        res.send(respond(lineGraph));
      });
    }

    next();
  }

};

module.exports = FormController;