var Models = require('../models');
var respond = require('./apiResponse');

var RealtimeController = {

  // GET /api/realtime/:id
  getData: (req, res, next)=>{
    Models.RealtimeGraph.findById(req.params.id, 'url duration width height color')
    .exec(function(err, graph){
      res.render('realtime', graph);
    });
  },

  // POST /api/realtime
  createGraph: (req, res, next)=>{
    Models.RealtimeGraph.create(req.body)
    .then(function(model){
      console.log(model);
      res.send(respond(model._id));
    });
  }
};

module.exports = RealtimeController;