const {dashboardInfo} = require('../controllers/dashboard.js');
const {verifyAuthToken} = require('../utills/utills.js');
const express = require('express');
const router = express.Router();

router.use(verifyAuthToken);

router.get('/dashboardInfo/:id', function(req, res){
})
router.get('/dashboardInfo', function(req, res, next){
  dashboardInfo(req, res, next);
})

module.exports = router;