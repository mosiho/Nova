import express from 'express';
import { authenticate, authorizeAdmin, authorizeUserOrAdmin } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get user account details
router.get('/account', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get user account details'
  });
});

// Update user account settings
router.put('/account', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Update user account settings'
  });
});

// Get user dashboard data (overview)
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get user dashboard data'
  });
});

// Get subscription history
router.get('/subscriptions', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get subscription history'
  });
});

// Get payment methods
router.get('/payment-methods', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get payment methods'
  });
});

// Add payment method
router.post('/payment-methods', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Add payment method'
  });
});

// Delete payment method
router.delete('/payment-methods/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Delete payment method'
  });
});

// Get upcoming test reminders
router.get('/reminders', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get upcoming test reminders'
  });
});

// Admin routes
router.use('/admin', authorizeAdmin);

// Get all users (admin only)
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get all users'
  });
});

// Get user by ID (admin or same user)
router.get('/:id', authorizeUserOrAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get user with ID: ${req.params.id}`
  });
});

// Update user by ID (admin only)
router.put('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update user with ID: ${req.params.id}`
  });
});

// Delete user by ID (admin only)
router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete user with ID: ${req.params.id}`
  });
});

export default router; 