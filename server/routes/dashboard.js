import dashboardController from '../controllers/dashboard.js';

const express = require('express');
const router = express.Router();

router.get('/dashboardInfo/:id',dashboardController.getDashboardDetailsById)
router.get('/dashboardInfo',dashboardController.getDashboardDetails)