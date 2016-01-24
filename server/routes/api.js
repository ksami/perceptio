var express = require('express');
var router = express.Router();

var TestController = require('../controllers').Test;
var RealtimeController = require('../controllers').Realtime;
var ThreeController = require('../controllers').Three;

router.get('/test', TestController.getTest);
router.post('/test', TestController.createTest);
router.put('/test/:id', TestController.updateTest);
router.delete('/test/:id', TestController.deleteTest);

router.get('/realtime/:id', RealtimeController.getData);
router.post('/realtime', RealtimeController.createGraph);

router.get('/three/:id', ThreeController.getData);
router.post('/three', ThreeController.createGraph);

module.exports = router;