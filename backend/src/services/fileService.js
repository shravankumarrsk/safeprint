const fs = require('fs').promises;
const path = require('path');

// Delete a file from the filesystem
const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`✅ File deleted: ${filePath}`);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`⚠️ File not found, already deleted: ${filePath}`);
      return true;
    }
    console.error(`❌ Error deleting file ${filePath}:`, error);
    return false;
  }
};

// Check if file exists
const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  deleteFile,
  fileExists,
};