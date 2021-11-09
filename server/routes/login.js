const express = require('express');
const router = express.Router();
const { loginUser, getuser, updateuser } = require('../controllers/login.js');

router.post('/login', function(req, res, next) {
  loginUser(req, res, next);
});

module.exports = router;