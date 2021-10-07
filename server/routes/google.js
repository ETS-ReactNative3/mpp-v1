const express = require('express');
const router = express.Router();
const {linkDrive , callBack , getFile , refreshToken} = require('../controllers/google/google.js');

router.get('/callback',function(req, res, next) {
    callBack(req, res,next);
})

router.get('/linkDrive',function(req, res , next){
    linkDrive(req, res, next);
})

router.post('/refreshToken',function(req, res , next){
    refreshToken(req, res, next);
})

router.get('/getFile',function(req, res, next){
    getFile(req, res, next);
})

module.exports = router;
