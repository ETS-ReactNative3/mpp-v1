const storyLine = require('./storyline.js');
const dashboard = require('./dashboard.js');
const google = require('./google.js');

const express = require('express');
const router = express.Router();

router.get('/healthCheck', function(req, res, next) {
  console.log('insise health check');
  //   res.setHeader('Content-Type', 'application/json');
  res.json({ 'api-status': 'working' });
  //   next();
});

router.use('/storyline', storyLine);

router.use('/dashboard',dashboard);

router.use('/google',google);

module.exports = router;