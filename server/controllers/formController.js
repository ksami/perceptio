var Models = require('../models');

var FormController = {

  // POST /form
  create: (req, res, next)=>{
    res.send({text: 'POST /api/test successful', data: req.body, received_at: new Date()});
    next();
  }

};

module.exports = FormController;