# To-Do List Manager

A simple MERN stack To-Do List application with clean structure and basic CRUD functionality.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)

## Features

- Add a to-do item (title)
- View all to-do items
- Mark to-do as completed / pending
- Delete a to-do item

## Project Structure

```
to_do_list/
├── server/
│   ├── models/
│   │   └── Todo.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTodo.jsx
│   │   │   └── TodoList.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── .env.example
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

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. The `.env` file should contain:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete a todo

## Deployment

The application is deployment-ready with proper environment variable usage:

- Backend uses `process.env.PORT || 5000`
- MongoDB connection comes from `.env` file
- Frontend uses API base URL from `.env` file
- No hardcoded URLs anywhere

## Running the Application

1. Make sure MongoDB is running
2. Start the backend server (`npm run dev` in server directory)
3. Start the frontend server (`npm run dev` in client directory)
4. Open `http://localhost:3000` in your browser

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string

### Frontend (.env)
- `VITE_API_BASE_URL`: Backend API base URL

## License

MIT License
