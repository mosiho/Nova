import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import labTestRoutes from './routes/labTest.routes';
import supplementRoutes from './routes/supplement.routes';
import subscriptionRoutes from './routes/subscription.routes';
import wearableRoutes from './routes/wearable.routes';

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lab-tests', labTestRoutes);
app.use('/api/supplements', supplementRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/wearables', wearableRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Connect to MongoDB (using in-memory server for development)
const startServer = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI;

    // If in development and no MongoDB URI is provided, use in-memory MongoDB
    if (process.env.NODE_ENV === 'development' && !mongoURI) {
      const mongod = await MongoMemoryServer.create();
      mongoURI = mongod.getUri();
      console.log('Using MongoDB Memory Server:', mongoURI);
    }

    await mongoose.connect(mongoURI || 'mongodb://localhost:27017/nova_health');
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

startServer();

export default app; 