const express = require('express');
const router = express.Router();

router.get('/getInfo/:id',function(req, res){
    res.send({'msg' : 'UserInfo'})
})

router.post('/saveFile/:id',function(req, res){
    res.send({'msg' : 'File SuccessFully Saved'})
})

router.post('/editFile/:id',function(req, res){
    res.send({'msg' : 'File SuccessFully Edited'})
})