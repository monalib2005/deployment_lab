# Simple E-commerce MERN Application

A minimal e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js) with basic CRUD operations and cart functionality.

## Features

- View all products
- View single product details
- Add new products (admin-like functionality)
- Delete products
- Basic shopping cart with add/remove items
- Clean, minimal UI with basic CSS
- Environment variable configuration for deployment

## Project Structure

```
e_commerce/
|-- server/
|   |-- models/
|   |   |-- Product.js
|   |-- routes/
|   |   |-- productRoutes.js
|   |-- controllers/
|   |   |-- productController.js
|   |-- server.js
|   |-- package.json
|   |-- .env.example
|
|-- client/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Header.jsx
|   |   |-- pages/
|   |   |   |-- Home.jsx
|   |   |   |-- ProductDetails.jsx
|   |   |   |-- AddProduct.jsx
|   |   |   |-- Cart.jsx
|   |   |-- services/
|   |   |   |-- api.js
|   |   |-- context/
|   |   |   |-- CartContext.jsx
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   |-- index.css
|   |-- package.json
|   |-- vite.config.js
|   |-- .env.example
|   |-- index.html
|
|-- README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)

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

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file if needed (default should work):
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `DELETE /api/products/:id` - Delete product

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Add some products using the "Add Product" link
3. Browse products on the home page
4. Click on products to view details
5. Add items to your cart
6. View and manage your cart

## Deployment Notes

The application is deployment-ready with proper environment variable usage:

- Backend uses `process.env.PORT || 5000`
- MongoDB connection comes from environment variables
- Frontend API base URL comes from environment variables
- No hardcoded URLs anywhere

For deployment on platforms like Azure, Heroku, or Vercel:

1. Set environment variables in your hosting platform
2. Build the frontend: `npm run build` (in client directory)
3. Deploy both backend and frontend according to your platform's requirements

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, Vite, React Router
- **Styling**: Plain CSS (no frameworks)
- **State Management**: React Context API (for cart)

## Limitations (Intentional)

This is a minimal implementation designed to be clean and beginner-friendly:

- No user authentication
- No payment processing
- No order management
- No advanced UI frameworks
- No Redux or complex state management
- No Docker/CI-CD pipelines

## License

MIT License
