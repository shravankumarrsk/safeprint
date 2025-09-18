const PrintJob = require('../models/PrintJob');
const fs = require('fs');
const path = require('path');

// Generate a random 8-character uppercase alphanumeric code
const generateAccessCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded or file type is not supported.' });
  }

  try {
    const access_code = generateAccessCode();
    const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry

    const newPrintJob = new PrintJob({
      original_filename: req.file.originalname,
      file_path: req.file.path,
      access_code,
      expires_at,
      file_type: req.file.mimetype,
      file_size: req.file.size,
    });

    await newPrintJob.save();

    res.status(201).json({
      msg: 'File uploaded successfully',
      accessCode: newPrintJob.access_code,
      expiresAt: newPrintJob.expires_at,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.accessFile = async (req, res) => {
  try {
    const { accessCode } = req.params;
    const printJob = await PrintJob.findOne({
      access_code: accessCode.toUpperCase(),
      status: 'pending',
    });

    if (!printJob) {
      return res.status(404).json({ msg: 'Invalid access code or file has already been accessed/deleted.' });
    }

    if (new Date() > printJob.expires_at) {
      return res.status(410).json({ msg: 'This file link has expired.' });
    }
    
    // Construct full URL for the frontend
    const fileUrl = `${req.protocol}://${req.get('host')}/${printJob.file_path.replace(/\\/g, '/')}`;

    res.json({
        id: printJob._id,
        originalFilename: printJob.original_filename,
        fileUrl: fileUrl,
        fileType: printJob.file_type,
        fileSize: printJob.file_size,
        expiresAt: printJob.expires_at,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.markAsPrinted = async (req, res) => {
  try {
    const printJob = await PrintJob.findById(req.params.id);

    if (!printJob) {
      return res.status(404).json({ msg: 'Print job not found.' });
    }

    // Delete the file from the server's filesystem
    fs.unlink(path.resolve(printJob.file_path), (err) => {
      if (err) {
        console.error('Failed to delete file from disk:', err);
        // We still proceed to delete the DB record
      } else {
        console.log(`Successfully deleted file: ${printJob.file_path}`);
      }
    });

    // Remove the record from the database
    await printJob.deleteOne();

    res.json({ msg: 'File has been securely deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};