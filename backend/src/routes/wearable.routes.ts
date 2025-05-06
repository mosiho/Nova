import express from 'express';
import { body } from 'express-validator';
import { authenticate, isPremiumUser } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all connected wearable devices
router.get('/devices', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get connected wearable devices'
  });
});

// Connect new wearable device (authenticate with provider)
router.post(
  '/devices/connect',
  [
    body('deviceType').notEmpty().withMessage('Device type is required'),
    body('authCode').notEmpty().withMessage('Authorization code is required')
  ],
  (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Connect wearable device'
    });
  }
);

// Disconnect wearable device
router.delete('/devices/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Disconnect device with ID: ${req.params.id}`
  });
});

// Sync data from wearable device
router.post('/sync', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Sync wearable data'
  });
});

// Get wearable data (by type and date range)
router.get('/data', (req, res) => {
  const { type, startDate, endDate } = req.query;
  
  res.status(200).json({
    success: true,
    message: `Get ${type} data from ${startDate} to ${endDate}`
  });
});

// Get heart rate data
router.get('/data/heart-rate', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get heart rate data'
  });
});

// Get sleep data
router.get('/data/sleep', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get sleep data'
  });
});

// Get HRV data
router.get('/data/hrv', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get HRV data'
  });
});

// Advanced analytics requires premium subscription
router.use('/analytics', isPremiumUser);

// Get correlation between wearable data and lab tests
router.get('/analytics/correlation', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get correlation analytics'
  });
});

// Get health trends and insights
router.get('/analytics/trends', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get health trends and insights'
  });
});

export default router; 