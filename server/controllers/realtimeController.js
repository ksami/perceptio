var Models = require('../models');
var respond = require('./apiResponse');

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
    Models.RealtimeGraph.create(req.body)
    .then(function(model){
      res.send(respond(model._id));
    })
    .catch(function(err){
      res.send(respond(null, err));
    });
  }
};

module.exports = RealtimeController;