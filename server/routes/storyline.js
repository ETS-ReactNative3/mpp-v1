const storySave  = require('../controllers/storyline.js');
const dashboardController = require('../controllers/dashboard.js');

const express = require('express');
const router = express.Router();


router.post('/new', function(req, res){
  console.log(req.body);
  storySave(req, res);
})
router.put('/:id', function(req, res){
  storyController.storyEdit
})

module.exports = router;