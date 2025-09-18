const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileUpload');
const fileController = require('../controllers/fileController');

// @route   POST /api/files/upload
// @desc    Upload a file and create a print job
router.post('/upload', upload.single('file'), fileController.uploadFile);

// @route   GET /api/files/:accessCode
// @desc    Access a file using the access code
router.get('/:accessCode', fileController.accessFile);

// @route   POST /api/files/:id/printed
// @desc    Mark a file as printed (and delete it)
router.post('/:id/printed', fileController.markAsPrinted);

module.exports = router;