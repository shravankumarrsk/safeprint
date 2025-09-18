const fs = require('fs');
const path = require('path');
const PrintJob = require('../models/PrintJob');

const runCleanup = async () => {
  try {
    const expiredJobs = await PrintJob.find({
      expires_at: { $lte: new Date() },
    });

    if (expiredJobs.length === 0) {
      console.log('Cleanup: No expired files to delete.');
      return;
    }

    for (const job of expiredJobs) {
      // Delete the file from the filesystem
      fs.unlink(path.resolve(job.file_path), async (err) => {
        if (err) {
          console.error(`Cleanup Error: Failed to delete file ${job.file_path}`, err);
        } else {
          console.log(`Cleanup Success: Deleted expired file ${job.file_path}`);
        }
        
        // Remove the record from the database regardless of file deletion status
        await job.deleteOne();
      });
    }
  } catch (error) {
    console.error('Error during cleanup job:', error);
  }
};

module.exports = { runCleanup };