#!/bin/bash

# Nova Health Tracker Setup Script

echo "Setting up Nova Health Tracker..."

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install Node.js (v14 or higher) and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install npm and try again."
    exit 1
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
echo "Backend dependencies installed successfully."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install
echo "Frontend dependencies installed successfully."

# Setup environment variables
cd ../backend
if [ ! -f .env ]; then
    echo "Creating .env file..."
    echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/nova_health
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d
NODE_ENV=development
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLIENT_URL=http://localhost:3000" > .env
    echo ".env file created successfully."
else
    echo ".env file already exists. Skipping creation."
fi

# Build backend
echo "Building backend..."
npm run build
echo "Backend built successfully."

# Back to root directory
cd ..

echo "Setup complete! You can now start the application:"
echo "To start the backend: cd backend && npm run dev"
echo "To start the frontend: cd frontend && npm start"
echo "Visit http://localhost:3000 in your browser to access the application."
echo "Thank you for using Nova Health Tracker!" 