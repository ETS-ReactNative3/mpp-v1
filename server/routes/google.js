const express = require('express');
const router = express.Router();
const {
  linkDrive,
  callBack,
} = require('../controllers/google/google.js');

router.get('/callback', function(req, res, next) {
  callBack(req, res, next);
});

router.get('/linkDrive', function(req, res, next) {
  linkDrive(req, res, next);
});

module.exports = router;