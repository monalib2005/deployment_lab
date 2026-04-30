# Student Record Management System

A simple and minimal CRUD-based Student Record Management System built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Add a student (name, email, course, marks)
- View all students
- View single student details
- Update student record
- Delete student record

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **HTTP Client**: Axios

## Project Structure

```
student_record/
|-- server/
|   |-- models/
|   |   |-- Student.js
|   |-- controllers/
|   |   |-- studentController.js
|   |-- routes/
|   |   |-- studentRoutes.js
|   |-- server.js
|   |-- package.json
|   |-- .env.example
|-- client/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Navbar.jsx
|   |   |-- pages/
|   |   |   |-- Home.jsx
|   |   |   |-- AddStudent.jsx
|   |   |   |-- ViewStudent.jsx
|   |   |   |-- EditStudent.jsx
|   |   |-- services/
|   |   |   |-- api.js
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   |-- index.css
|   |-- package.json
|   |-- vite.config.js
|   |-- .env.example
|-- README.md
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

3. Create a `.env` file in the server directory:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB connection string:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

5. Start the backend server:
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

3. Create a `.env` file in the client directory:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file if needed (default should work for local development):
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## Usage

1. Make sure both backend and frontend servers are running
2. Open your browser and navigate to `http://localhost:3000`
3. Use the interface to:
   - View all students on the home page
   - Add new students using the "Add Student" link
   - View individual student details
   - Edit existing student records
   - Delete students

## API Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get single student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student by ID
- `DELETE /api/students/:id` - Delete student by ID

## Student Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  course: String (required),
  marks: Number (required, min: 0, max: 100),
  timestamps: true
}
```

## Deployment

The application is deployment-ready with proper environment variable usage:

- Backend uses `process.env.PORT || 5000` for port configuration
- MongoDB connection string comes from `.env` file
- Frontend uses API base URL from `.env` file
- No hardcoded URLs anywhere

For deployment on platforms like Azure, ensure the environment variables are properly configured in your hosting environment.

## Development

- Backend runs in development mode with `npm run dev` (uses nodemon)
- Frontend runs in development mode with `npm run dev` (uses Vite)
- Both servers support hot reloading during development

## Notes

- This is a minimal implementation without authentication
- No complex state management (Redux/Context API)
- Basic error handling and validation included
- Clean, readable code with proper folder structure
- Ready for deployment without additional configuration
