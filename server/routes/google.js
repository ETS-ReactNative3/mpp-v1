const express = require('express');
const router = express.Router();
const uploadFile = require('../controllers/google.js');

router.get('/callback',function(req, res){
    uploadFile(req, res);
})
  

module.exports = router;
