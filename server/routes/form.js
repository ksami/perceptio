var express = require('express');
var router = express.Router();

var FormController = require('../controllers').Form;

router.get('/form', FormController.render);
router.post('/form', FormController.create);

module.exports = router;