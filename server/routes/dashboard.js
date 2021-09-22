const dashboardController = require('../controllers/dashboard.js');

const express = require('express');
const router = express.Router();

router.get('/dashboardInfo/:id', function(req, res){
  dashboardController.getDashboardDetailsById
})
router.get('/dashboardInfo', function(req, res){
  dashboardController.getDashboardDetails
})

module.exports = router;