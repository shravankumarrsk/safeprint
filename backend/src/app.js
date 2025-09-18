const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
require('dotenv').config();

const connectDB = require('./config/database');
const fileRoutes = require('./routes/files');
const { runCleanup } = require('./services/cleanupService');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors()); // Allows frontend to connect
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/files', fileRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SafePrint API is healthy' });
});

// Schedule cleanup job to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Running scheduled cleanup job for expired files...');
  runCleanup();
});

module.exports = app;