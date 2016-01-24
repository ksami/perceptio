var Models = require('../models');
var respond = require('./apiResponse');
var Validator = require('../middleware/validator');

var RealtimeController = {

  // GET /api/realtime/:id
  getData: (req, res, next)=>{
    Models.RealtimeGraph.findById(req.params.id, 'url duration size color')
    .exec(function(err, graph){
      res.render('realtime', graph);
    });
  },

  // POST /api/realtime
  createGraph: (req, res, next)=>{
    var match = Validator.isRealTimeGraph(req.body);

    if (!match.result){
      res.send(respond(null, match.error));
    }
    else{
      Models.RealtimeGraph.create(req.body)
      .then(function(model){
        res.send(respond(model._id));
      });  
    }
  }
};

module.exports = RealtimeController;