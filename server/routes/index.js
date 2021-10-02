const storyLine = require('./storyline.js');
const dashboard = require('./dashboard.js');
const google = require('./google.js');
const login = require('./login.js');

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
<<<<<<< HEAD

router.use('/auth',login);
=======
>>>>>>> 9dfc08a (fix : Google Drive)

router.use('/auth',login);

module.exports = router;