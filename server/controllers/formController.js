var Models = require('../models');
var respond = require('./apiResponse');

var FormController = {

  // POST /form
  create: (req, res, next)=>{
    var lineGraph =  new Models.LineGraph(req.body);
    lineGraph.save()
    .then(function(model){
      console.log(model);
      res.send(respond(lineGraph));
    });
    next();
  }

};

module.exports = FormController;