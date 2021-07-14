const express = require('express');
const router = express.Router();

router.get('/healthCheck', function(req, res, next) {
  console.log('insise health check');
  //   res.setHeader('Content-Type', 'application/json');
  res.json({ 'api-status': 'working' });
  //   next();
});

module.exports = router;
