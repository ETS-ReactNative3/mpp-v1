const express = require('express');
const router = express.Router();
const { getuser, updateuser } = require('../controllers/login.js');
const {verifyAuthToken} = require('../utills/utills.js');

router.use(verifyAuthToken);

router.get('/:id', function(req, res, next) {
  getuser(req, res, next);
});

router.post('/:id', function(req, res, next) {
  updateuser(req, res, next);
});

module.exports = router;
