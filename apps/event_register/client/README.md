# Event Registration Frontend

React frontend for the Event Registration System built with Vite.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your API base URL:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Features

- View list of events
- Event details page with registration form
- View registrations for each event
- Responsive design with basic CSS

## Pages

- **Home** (`/`) - List all available events
- **Event Details** (`/event/:id`) - Event details and registration form
- **View Registrations** (`/registrations`) - All registrations grouped by event

## Components Structure

- `App.jsx` - Main app with routing
- `pages/Home.jsx` - Events listing page
- `pages/EventDetails.jsx` - Event details and registration
- `pages/ViewRegistrations.jsx` - All registrations view
- `services/api.js` - API service functions
