const express = require('express');
const router = express.Router();

router.get('/dashboard/getInfo/:id',function(req, res){
    res.send({'msg' : 'dashboard details'})
})

router.post('/saveFile/:id',function(req, res){
    res.send({'msg' : 'Story File SuccessFully Saved'})
})

router.put('/editFile/:id',function(req, res){
    res.send({'msg' : 'Story File SuccessFully Edited'})
})