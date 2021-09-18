import storyController from '../controllers/storyline.js';
import dashboardController from '../controllers/dashboard.js';

const express = require('express');
const router = express.Router();


router.post('/:id',storyController.storySave)
router.put('/:id',storyController.storyEdit)