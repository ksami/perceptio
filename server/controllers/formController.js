var Models = require('../models');
var respond = require('./apiResponse');
var path = require('path');
var Validator = require('../middleware/validator');
var draw = require('../draw');

var FormController = {

  // POST /form
  create: (req, res, next)=>{
    var match = Validator.isTimeGraph(req.body);

    if(!match.result){
      res.send(respond(null, match.error));
      next();
    }
    else{
      draw('lineGraph', req.body, function(img){
        res.set('Content-Type', 'image/png');
        res.set('Content-Length', img.length);
        res.send(img);
        next();
      });

    }
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

    next();
  },

  // Get
  render: (req, res, next)=> {
    res.sendFile(path.join(__dirname + '../../public/form.html'));
    next();
  }

};

module.exports = FormController;