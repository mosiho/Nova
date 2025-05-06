# Nova Health Tracker

Nova Health Tracker is a comprehensive health tracking web application designed to help users monitor their health metrics, view lab test results, and receive personalized supplement recommendations based on their health data.

## Features

### User Authentication
- Sign up/login with email and password
- JWT-based authentication
- Role-based access (user & admin)

### Lab Test Management
- Upload lab test results (blood, DNA, RNA, hormone, microbiome, etc.)
- View historical test results
- Visual representation of health metrics
- Comparison to population averages

### Supplement Recommendations
- AI-powered supplement recommendations based on lab test results
- Personalized dosage recommendations
- Purchase supplements as monthly subscriptions

### Wearable Device Integration
- Connect health wearables (Apple Watch, Fitbit, etc.)
- Sync health data including:
  - Heart rate & HRV
  - Sleep quality and duration
  - Physical activity
  - Steps and calorie information

### Subscription Plans
- Free plan: Basic health tracking
- Premium plan:
  - Advanced analytics
  - Comparative analysis (over time and against peers)
  - Personal health assistant chatbot

### Health Dashboard
- Overview of key health metrics
- Reminders for upcoming tests
- Visual charts of health trends

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payment processing

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Chart.js for data visualization
- Stripe.js for payment processing

## Project Structure

```
/
├── backend/               # Backend API with Express
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── config/        # Configuration files
│   │   └── utils/         # Utility functions
│   └── ...
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React Context API
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service integrations
│   │   ├── utils/         # Utility functions
│   │   └── ...
│   └── ...
└── ...
```

## Getting Started

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/nova-health.git
cd nova-health
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Configure environment variables
```bash
# Create a .env file in the backend directory
cp .env.sample .env
# Edit the .env file with your specific configuration
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

5. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

6. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Lab Tests
- `GET /api/lab-tests` - Get all lab tests for a user
- `GET /api/lab-tests/:id` - Get a specific lab test
- `POST /api/lab-tests` - Create a new lab test
- `PUT /api/lab-tests/:id` - Update a lab test
- `DELETE /api/lab-tests/:id` - Delete a lab test
- `POST /api/lab-tests/upload` - Upload lab test file
- `GET /api/lab-tests/history` - Get test history metrics

### Supplements
- `GET /api/supplements` - Get all supplements
- `GET /api/supplements/:id` - Get a specific supplement
- `GET /api/supplements/search` - Search supplements
- `GET /api/supplements/recommendations` - Get supplement recommendations

### Subscriptions
- `GET /api/subscriptions` - Get user's active subscriptions
- `POST /api/subscriptions` - Create a new subscription
- `PUT /api/subscriptions/:id` - Update a subscription
- `DELETE /api/subscriptions/:id` - Cancel a subscription
- `POST /api/subscriptions/webhook` - Webhook for Stripe events

### Wearables
- `GET /api/wearables/devices` - Get connected wearable devices
- `POST /api/wearables/devices/connect` - Connect new wearable device
- `DELETE /api/wearables/devices/:id` - Disconnect wearable device
- `POST /api/wearables/sync` - Sync data from wearable device
- `GET /api/wearables/data` - Get wearable data
- `GET /api/wearables/analytics/correlation` - Get correlation analytics (premium)
- `GET /api/wearables/analytics/trends` - Get health trends and insights (premium)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 