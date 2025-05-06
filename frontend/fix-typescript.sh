#!/bin/bash

echo "🔧 Fixing TypeScript errors in the Nova Health Tracker project..."

# Step 1: Clear node_modules and cache
echo "📦 Cleaning up node_modules and npm cache..."
rm -rf node_modules
rm -rf .cache
rm -rf package-lock.json

# Step 2: Install dependencies
echo "📥 Installing dependencies..."
npm install

# Step 3: Install TypeScript definitions
echo "🔤 Installing TypeScript type definitions..."
npm install --save-dev \
  @types/react@^18.2.38 \
  @types/react-dom@^18.2.17 \
  @types/node@^16.18.65 \
  @types/jest@^27.5.2 \
  @types/react-router-dom@^5.3.3 \
  @types/react-dropzone@^5.1.0 \
  @types/react-table@^7.7.18

# Step 4: Create required directories
echo "📁 Creating types directory if it doesn't exist..."
mkdir -p src/types

# Step 5: Run TypeScript compiler to check for errors
echo "🔍 Running TypeScript compiler to check for errors..."
npx tsc --noEmit

echo "✅ Setup complete! If TypeScript errors still exist, try restarting your IDE/editor."
echo "   You may also need to run: npm start to let Create React App rebuild its cache." 