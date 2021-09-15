const express = require('express');
const router = express.Router();

import GDrive from './gDrive.js';

router.get('/healthCheck', function(req, res, next) {
  console.log('insise health check');
  //   res.setHeader('Content-Type', 'application/json');
  res.json({ 'api-status': 'working' });
  //   next();
});

router.use('/GDrive',GDrive);

module.exports = router;
