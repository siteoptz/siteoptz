# Marketing ROI Tracker

A comprehensive web application for business owners to track and analyze the return on investment (ROI) of their marketing campaigns.

## Features

- **Campaign Management**: Create and manage multiple marketing campaigns across different channels
- **Real-time ROI Tracking**: Automatic calculation of ROI, ROAS, CPA, and other key metrics
- **Dashboard Overview**: Visual representation of overall marketing performance
- **Detailed Analytics**: Track trends, channel performance, and conversion metrics
- **Data Export**: Export analytics data to CSV for further analysis
- **Multi-channel Support**: Track campaigns across Google Ads, Facebook, Instagram, LinkedIn, Email, and more

## Tech Stack

- **Backend**: Node.js, Express.js, SQLite
- **Frontend**: React 18, Recharts for data visualization
- **Styling**: CSS3 with modern gradients and animations

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd marketing-roi-tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The server will run on http://localhost:5000

2. In a new terminal, start the frontend:
```bash
cd frontend
npm start
```
The application will open in your browser at http://localhost:3000

3. Seed the database with demo data (optional):
```bash
cd backend
npm run seed
```

## Key Metrics Tracked

- **ROI (Return on Investment)**: ((Revenue - Cost) / Cost) × 100
- **ROAS (Return on Ad Spend)**: Revenue / Cost
- **CPA (Cost Per Acquisition)**: Cost / Conversions
- **CTR (Click-Through Rate)**: (Clicks / Impressions) × 100
- **Conversion Rate**: (Conversions / Clicks) × 100

## API Endpoints

- `GET /api/campaigns` - Get all campaigns with calculated metrics
- `POST /api/campaigns` - Create a new campaign
- `GET /api/campaigns/:id` - Get specific campaign details
- `GET /api/campaigns/:id/metrics` - Get campaign metrics history
- `POST /api/campaigns/:id/metrics` - Add new metrics to a campaign
- `GET /api/dashboard` - Get dashboard overview data
- `GET /api/analytics/roi-trend` - Get ROI trend data
- `GET /api/analytics/channel-performance` - Get channel performance comparison

## Database Schema

- **users**: Store user information
- **campaigns**: Marketing campaign details
- **campaign_metrics**: Daily performance metrics
- **roi_calculations**: Calculated ROI data

## Demo Credentials

The application comes with pre-seeded demo data for:
- 8 different marketing campaigns
- 30 days of historical metrics
- Various marketing channels and campaign types

## License

MIT