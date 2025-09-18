const express = require('express');
const router = express.Router();
const printJobController = require('../controllers/printJobController');
const auth = require('../middleware/auth'); // Middleware to protect routes

// @route   GET /api/printjobs
// @desc    Get all print jobs (Admin only)
router.get('/', auth, printJobController.getAllPrintJobs);

// @route   DELETE /api/printjobs/:id
// @desc    Delete a specific print job by ID (Admin only)
router.delete('/:id', auth, printJobController.deletePrintJob);

module.exports = router;