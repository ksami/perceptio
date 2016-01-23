var Models = require('../models');
var respond = require('./apiResponse');
var Validator = require('../middleware/validator');

var FormController = {

  // POST /form
  create: (req, res, next)=>{
    var match = Validator.isTimeGraph(req.body);
    
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
  },

  // POST /form2
  createTimeGraph: (req,res,next)=>{
    var match = Validator.isTimeGraph(req.body);
    
    if(!match.result){
      res.send(respond(null, match.error));
    }
    else{
      var timeGraph = new Models.TimeGraph(req.body);
      timeGraph.save()
      .then(function(model){
        console.log(model);
        res.send(respond(timeGraph));
      });
    }
  }

};

module.exports = FormController;