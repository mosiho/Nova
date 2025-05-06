import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all supplements (public catalog)
router.get('/', (req, res) => {
  // This would be implemented in the supplements controller
  res.status(200).json({
    success: true,
    message: 'Get all supplements'
  });
});

// Get single supplement by ID
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get supplement with ID: ${req.params.id}`
  });
});

// Search supplements
router.get('/search', (req, res) => {
  const { query } = req.query;
  
  res.status(200).json({
    success: true,
    message: `Search supplements with query: ${query}`
  });
});

// Get recommendations based on user's lab tests
router.get('/recommendations', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get supplement recommendations for user'
  });
});

// Following routes are admin-only
router.use(authorizeAdmin);

// Create new supplement
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('benefits').isArray().withMessage('Benefits must be an array'),
    body('category').notEmpty().withMessage('Category is required'),
    body('recommendedDosage').notEmpty().withMessage('Recommended dosage is required'),
    body('price').isNumeric().withMessage('Price must be a number')
  ],
  (req, res) => {
    res.status(201).json({
      success: true,
      message: 'Create new supplement'
    });
  }
);

// Update supplement
router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('benefits').isArray().withMessage('Benefits must be an array'),
    body('category').notEmpty().withMessage('Category is required'),
    body('recommendedDosage').notEmpty().withMessage('Recommended dosage is required'),
    body('price').isNumeric().withMessage('Price must be a number')
  ],
  (req, res) => {
    res.status(200).json({
      success: true,
      message: `Update supplement with ID: ${req.params.id}`
    });
  }
);

// Delete supplement
router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete supplement with ID: ${req.params.id}`
  });
});

export default router; 