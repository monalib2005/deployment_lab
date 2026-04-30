# Event Registration Backend

Backend server for the Event Registration System using Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your MongoDB connection string:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Events
- `GET /api/events` - Get all events (seeds static events on first run)
- `GET /api/events/:id` - Get specific event by ID

### Registrations
- `POST /api/registrations` - Create new registration
- `GET /api/registrations/:eventId` - Get registrations for specific event
- `GET /api/registrations` - Get all registrations

## Models

### Event
- id (String, unique)
- title (String)
- date (String)
- description (String)

### Registration
- eventId (String)
- name (String)
- email (String)
- timestamps
