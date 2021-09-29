const express = require('express');
const router = express.Router();
const {linkDrive , callBack} = require('../controllers/google.js');

router.get('/callback',function(req, res){
    callBack(req, res);
})

router.get('/linkDrive',function(req, res){
    linkDrive(req, res);
})

module.exports = router;
