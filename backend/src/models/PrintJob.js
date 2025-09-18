const mongoose = require('mongoose');

const PrintJobSchema = new mongoose.Schema(
  {
    original_filename: { type: String, required: true },
    file_path: { type: String, required: true },
    access_code: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      enum: ['pending', 'accessed', 'deleted'],
      default: 'pending',
    },
    expires_at: { type: Date, required: true, index: true },
    accessed_at: { type: Date },
    file_type: { type: String },
    file_size: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model('PrintJob', PrintJobSchema);