const express = require('express');
const storySave = require('../controllers/storyline.js');
const {updateFile, getFile, deleteFile} = require('../controllers/google/google.js');
const router = express.Router();

router.post('/new', function(req, res, next) {
  storySave(req, res, next);
});
router.put('/:id', function(req, res, next) {
  updateFile(req, res, next);
}); // This will edit google drive file and return status

router.get('/:id', function(req, res, next) {
  getFile(req, res, next);
}); // This will call google drive getFile and return results to UI

router.delete('/:id', function(req, res, next) {
  deleteFile(req, res, next);
}); // This will delete google drive file and return status

module.exports = router;
