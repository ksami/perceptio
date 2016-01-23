var express = require('express');
var router = express.Router();

var FormController = require('../controllers').Form;

router.get('/form', FormController.render);
router.post('/form', FormController.create);
router.post('/form2', FormController.createTimeGraph);

module.exports = router;