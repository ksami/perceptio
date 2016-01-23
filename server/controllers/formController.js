var Models = require('../models');
var respond = require('./apiResponse');
var Validator = require('../middleware/validator');

var FormController = {

  // POST /form
  create: (req, res, next)=>{
    var valid = Validator.isLineGraph(req.body);
    
    if(!valid.result){
      res.send(respond(null, valid.error));
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