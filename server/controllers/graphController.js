var Models = require('../models');

var TestController = {

  // GET /api/test
  getTest: (req, res, next)=>{
    var model =  new Models.Model({name: 'hello'});
    res.send({text: 'GET /api/test successful', received_at: new Date(), data: model});
    next();
  },

  // POST /api/test
  createTest: (req, res, next)=>{
    res.send({text: 'POST /api/test successful', data: req.body, received_at: new Date()});
    next();
  }, 

  // PUT /api/test/:id
  updateTest: (req, res, next)=>{
    var id = req.params.id;
    res.send({text: `PUT /api/test/${id} successful`, data: req.body, received_at: new Date()});
    next();
  },

  // DELETE /api/test/:id
  deleteTest: (req, res, next)=>{
    var id = req.params.id;
    res.send({text: `DELETE /api/test/${id} successful`, received_at: new Date()});
    next();
  }
};

module.exports = TestController;