var Models = require('../models');
var respond = require('./apiResponse');
var Validator = require('../middleware/validator');

var _ = require('lodash');

var ThreeController = {

  // GET /api/realtime/:id
  getData: (req, res, next)=>{
    Models.ThreeGraph.findById(req.params.id, 'points')
    .exec(function(err, graph){
      var g = _.map(graph.points, el=>{
        console.log(el);
        var tel = _.pick(el, ['x', 'y', 'z', 'color']);
        tel.toString = function(){
          return "{x:"+this.x+",y:"+this.y+",z:"+this.z+",color:'"+this.color+"'}";
        };
        return tel;
      });
      var args = {points: g};
      console.log(args);

      res.render('three', args);
    });
  },

  // POST /api/realtime
  createGraph: (req, res, next)=>{
    // var match = Validator.isRealTimeGraph(req.body);

    // if (!match.result){
      // res.send(respond(null, match.error));
    // }
    // else{
      Models.ThreeGraph.create(req.body)
      .then(function(model){
        res.send(respond(model._id));
      });  
    // }
  }
};

module.exports = ThreeController;