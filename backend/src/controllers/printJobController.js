const PrintJob = require('../models/PrintJob');
const { deleteFile } = require('../services/fileService');

// Get all print jobs (for an admin dashboard)
const getAllPrintJobs = async (req, res) => {
  try {
    // Sort by most recent
    const printJobs = await PrintJob.find().sort({ createdAt: -1 });
    res.json({ success: true, data: printJobs });
  } catch (error) {
    console.error('Error getting all print jobs:', error);
    res.status(500).json({ error: 'Failed to retrieve print jobs' });
  }
};

// Delete a specific print job by ID (for an admin)
const deletePrintJob = async (req, res) => {
  try {
    const { id } = req.params;
    const printJob = await PrintJob.findById(id);

    if (!printJob) {
      return res.status(404).json({ error: 'Print job not found' });
    }

    // Delete the physical file if it still exists
    await deleteFile(printJob.file_path);

    // Delete the database record
    await PrintJob.findByIdAndDelete(id);

    res.json({ success: true, message: 'Print job deleted successfully' });
  } catch (error) {
    console.error('Error deleting print job:', error);
    res.status(500).json({ error: 'Failed to delete print job' });
  }
};

module.exports = {
  getAllPrintJobs,
  deletePrintJob,
};