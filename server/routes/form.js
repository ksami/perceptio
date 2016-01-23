var express = require('express');
var router = express.Router();

var TestController = require('../controllers').Test;

router.get('/form', TestController.getTest);
router.post('/form', TestController.createTest);
router.put('/form/:id', TestController.updateTest);
router.delete('/form/:id', TestController.deleteTest);

module.exports = router;