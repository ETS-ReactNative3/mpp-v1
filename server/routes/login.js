const express = require('express');
const router = express.Router();
const {loginUser,getuser} = require('../controllers/login.js');

router.post('/login',function(req, res , next){
    loginUser(req, res, next);
})

router.get('/user',function(req, res, next){
    getuser(req, res ,next);
})


module.exports = router;