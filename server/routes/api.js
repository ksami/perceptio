var express = require('express');
var router = express.Router();

var TestController = require('../controllers').Test;

router.get('/test', TestController.getTest);
router.post('/test', TestController.createTest);
router.put('/test/:id', TestController.updateTest);
router.delete('/test/:id', TestController.deleteTest);

module.exports = router;