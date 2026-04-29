# MERN Blog Application

A simple and minimal MERN stack blog application with basic CRUD functionality.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)

## Features

- Create blog posts (title + content)
- View all blog posts
- View single blog post
- Delete blog posts

## Project Structure

```
mern-blog/
├── server/                 # Backend
│   ├── models/
│   │   └── Blog.js        # Blog schema
│   ├── routes/
│   │   └── posts.js       # API routes
│   ├── controllers/
│   │   └── postController.js # Business logic
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
└── client/                # Frontend
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   │   ├── Home.jsx   # List all posts
    │   │   ├── CreatePost.jsx # Create new post
    │   │   └── ViewPost.jsx # View single post
    │   ├── services/
    │   │   └── api.js     # API service layer
    │   ├── App.jsx        # Main app component
    │   ├── main.jsx       # Entry point
    │   ├── App.css        # App styles
    │   └── index.css      # Global styles
    ├── package.json       # Frontend dependencies
    ├── vite.config.js     # Vite configuration
    ├── index.html         # HTML template
    └── .env               # Environment variables
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

### 1. Clone and Setup

```bash
# Navigate to project directory
cd mern-blog
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with your MongoDB connection string
# Example:
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-blog

# Start the backend server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create .env file
VITE_API_BASE_URL=http://localhost:5000/api

# Start the frontend development server
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## API Endpoints

### Blog Posts

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get single blog post
- `POST /api/posts` - Create new blog post
- `DELETE /api/posts/:id` - Delete blog post

## Usage

1. **View Posts**: Navigate to home page to see all blog posts
2. **Create Post**: Click "Create Post" in navigation to add new post
3. **View Post**: Click "Read More" on any post card to view full post
4. **Delete Post**: On post detail page, click "Delete" button

## Deployment Ready

The application is configured for deployment:

- Backend uses `process.env.PORT || 5000`
- Frontend uses API base URL from environment variables
- No hardcoded URLs
- Environment variables properly configured

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Development

### Backend Development
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd client
npm run dev  # Uses Vite dev server
```

## Production Build

### Frontend
```bash
cd client
npm run build
```

### Backend
```bash
cd server
npm start
```

## License

MIT
