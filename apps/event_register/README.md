# Event Registration System

A simple MERN stack application for event registration with predefined static events.

## Features

- Display 5 predefined static events
- View event details
- Register for events (name, email)
- View registrations for each event
- Clean, minimal UI with basic CSS

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)

## Project Structure

```
event-register/
├── server/                 # Backend
│   ├── controllers/        # Route controllers
│   ├── data/              # Static events data
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Express server
│   ├── package.json
│   └── .env.example
├── client/                # Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.jsx
│   ├── package.json
│   └── .env.example
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your API base URL (default should work for local development):
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. View the list of available events
3. Click on any event to see details and register
4. Fill out the registration form with name and email
5. View registrations for each event or all registrations

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get specific event by ID

### Registrations
- `POST /api/registrations` - Create new registration
- `GET /api/registrations/:eventId` - Get registrations for specific event
- `GET /api/registrations` - Get all registrations

## Static Events

The system includes 5 predefined events:
1. Tech Conference 2024
2. 24-Hour Hackathon
3. Web Development Workshop
4. Cultural Fest 2024
5. Digital Marketing Webinar

## Deployment

The application is deployment-ready with environment variables configured. Ensure you set the correct environment variables for your deployment platform.

## License

ISC
