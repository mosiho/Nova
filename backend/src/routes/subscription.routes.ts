import express from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get user's active subscriptions
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get user subscriptions'
  });
});

// Get subscription by ID
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get subscription with ID: ${req.params.id}`
  });
});

// Create new subscription (premium plan or supplement)
router.post(
  '/',
  [
    body('type').notEmpty().withMessage('Subscription type is required'),
    body('paymentMethodId').notEmpty().withMessage('Payment method ID is required')
  ],
  (req, res) => {
    res.status(201).json({
      success: true,
      message: 'Create new subscription'
    });
  }
);

// Update subscription (change quantity, pause, etc)
router.put(
  '/:id',
  [
    body('action').isIn(['pause', 'resume', 'cancel', 'update_quantity']).withMessage('Valid action is required')
  ],
  (req, res) => {
    res.status(200).json({
      success: true,
      message: `Update subscription with ID: ${req.params.id}`
    });
  }
);

// Cancel subscription
router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Cancel subscription with ID: ${req.params.id}`
  });
});

// Webhook for Stripe events
router.post('/webhook', (req, res) => {
  // This would handle Stripe webhook events
  res.status(200).json({
    success: true,
    message: 'Webhook received'
  });
});

export default router; 