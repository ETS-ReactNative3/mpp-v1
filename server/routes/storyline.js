const express = require('express');
const storySave = require('../controllers/storyline.js');

const router = express.Router();

router.post('/new', function(req, res, next) {
  storySave(req, res, next);
});
router.put('/:id', function(req, res) {});

module.exports = router;
