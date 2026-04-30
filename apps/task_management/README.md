# Task Management Application

A simple and minimal Task Management Application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create tasks with title and description
- View all tasks
- Update task status (pending ↔ completed)
- Delete tasks
- Clean and simple UI

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)

## Project Structure

```
task_management/
├── server/
│   ├── models/
│   │   └── Task.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Task.jsx
│   │   │   └── AddTask.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
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

3. Configure environment variables:
   - Open `.env` file
   - Update `MONGO_URI` with your MongoDB connection string
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - The `.env` file is already configured for local development
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The application will open in your browser at `http://localhost:3000`

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Task Schema

```javascript
{
  title: String (required),
  description: String (required),
  status: String ("pending" | "completed", default: "pending"),
  timestamps: true
}
```

## Usage

1. Start both backend and frontend servers
2. Open your browser and navigate to `http://localhost:3000`
3. Add new tasks using the form
4. Toggle task status using the checkbox
5. Delete tasks using the delete button

## Deployment Ready

The application is configured for deployment with:

- Environment variables for configuration
- Proper CORS setup
- Clean folder structure
- No hardcoded URLs

For deployment, update the environment variables in both `.env` files with your production URLs and database connection string.

## Notes

- This is a minimal implementation without authentication
- Uses basic CSS for styling (no UI frameworks)
- No state management libraries (Redux/Context)
- No advanced features like deadlines, priorities, or notifications
