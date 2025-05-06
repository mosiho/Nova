import express from 'express';
import { body } from 'express-validator';
import * as labTestController from '../controllers/labTest.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all lab tests for user
router.get('/', labTestController.getUserLabTests);

// Get single lab test by ID
router.get('/:id', labTestController.getLabTestById);

// Get lab test history metrics for charts
router.get('/history', labTestController.getLabTestHistory);

// Create new lab test
router.post(
  '/',
  [
    body('type').notEmpty().withMessage('Test type is required'),
    body('name').notEmpty().withMessage('Test name is required'),
    body('provider').notEmpty().withMessage('Provider name is required'),
    body('date').isISO8601().withMessage('Valid test date is required'),
    body('results').isArray().withMessage('Results must be an array')
  ],
  labTestController.createLabTest
);

// Update lab test
router.put(
  '/:id',
  [
    body('type').notEmpty().withMessage('Test type is required'),
    body('name').notEmpty().withMessage('Test name is required'),
    body('provider').notEmpty().withMessage('Provider name is required'),
    body('date').isISO8601().withMessage('Valid test date is required'),
    body('results').isArray().withMessage('Results must be an array')
  ],
  labTestController.updateLabTest
);

// Delete lab test
router.delete('/:id', labTestController.deleteLabTest);

// Upload lab test file (e.g., PDF report)
router.post('/upload', labTestController.uploadLabTestFile);

export default router; 