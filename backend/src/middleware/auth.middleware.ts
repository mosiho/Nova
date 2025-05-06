import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserRole } from '../models/user.model';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Authentication middleware
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token provided'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback_jwt_secret'
    ) as { id: string };
    
    // Find user by id
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is invalid or user not found'
      });
    }
    
    // Set user in request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({
      success: false,
      message: 'Token validation failed'
    });
  }
};

// Authorization middleware for admin only
export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === UserRole.ADMIN) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied: Admin role required'
    });
  }
};

// Check if user has premium subscription
export const isPremiumUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.subscriptionPlan === 'premium') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied: Premium subscription required'
    });
  }
};

// Current user or admin can access resource
export const authorizeUserOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId || req.params.id;
  
  if (
    req.user && 
    (req.user._id.toString() === userId || req.user.role === UserRole.ADMIN)
  ) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied: You can only access your own resources'
    });
  }
}; 