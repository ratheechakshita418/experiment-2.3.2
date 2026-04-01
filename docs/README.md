# Shopping Cart Application

A full-stack shopping cart application built with React, Redux Toolkit, Node.js, Express, and MongoDB. This project demonstrates modern web development practices with detailed explanations for students.

## 🏗️ Architecture Overview

This application consists of two main parts:

- **Frontend (React)**: User interface with product catalog, shopping cart, and product management
- **Backend (Node.js/Express)**: REST API for product data management
- **Database (MongoDB)**: Stores product information

## 🚀 Tech Stack

### Frontend
- **React 18**: Modern React with hooks
- **Redux Toolkit**: State management for shopping cart
- **Material-UI**: Component library for consistent UI
- **Axios**: HTTP client for API calls

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for APIs
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB

## 📁 Project Structure

```
root/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── app/store.js    # Redux store
│   │   ├── features/cart/  # Cart state management
│   │   ├── components/     # React components
│   │   └── ...
├── server/                 # Node.js backend
│   ├── config/db.js        # Database connection
│   ├── models/Product.js   # Product data model
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── middlewares/        # Error handling
│   └── server.js           # Main server file
└── docs/                   # Documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env` file and update MongoDB connection string if needed

4. Start the server:
   ```bash
   npm run dev  # Development mode with nodemon
   # or
   npm start    # Production mode
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   Frontend will run on `http://localhost:3000`

## 🔧 Configuration

### Environment Variables (server/.env)
```
MONGO_URI=mongodb://localhost:27017/shopping-cart
PORT=5000
```

### Proxy Configuration
The frontend is configured to proxy API requests to the backend during development. This is set up in `client/src/setupProxy.js` and `client/package.json`.

## 📡 API Endpoints

### Products
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create a new product

### Request/Response Examples

**Create Product:**
```bash
POST /api/products
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "price": 99.99,
  "image": "https://example.com/headphones.jpg",
  "description": "High-quality wireless headphones with noise cancellation"
}
```

**Response:**
```json
{
  "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
  "name": "Wireless Headphones",
  "price": 99.99,
  "image": "https://example.com/headphones.jpg",
  "description": "High-quality wireless headphones with noise cancellation",
  "createdAt": "2023-09-01T10:00:00.000Z",
  "updatedAt": "2023-09-01T10:00:00.000Z"
}
```

## 🎯 Features

### Frontend Features
- **Product Catalog**: Display all products in a responsive grid
- **Shopping Cart**: Add, remove, and update item quantities
- **Persistent Cart**: Cart data saved in localStorage
- **Add Products**: Form to create new products
- **Loading States**: User feedback during API calls
- **Error Handling**: Graceful error messages

### Backend Features
- **RESTful API**: Standard HTTP methods for CRUD operations
- **MongoDB Integration**: Document-based data storage
- **Error Middleware**: Centralized error handling
- **CORS Support**: Cross-origin request handling
- **Input Validation**: Data validation and sanitization

## 🔄 Data Flow

1. **Frontend** makes API call using Axios
2. **Proxy** forwards request to backend (development only)
3. **Express server** receives request and routes to controller
4. **Controller** processes request and interacts with database
5. **Mongoose model** queries/updates MongoDB
6. **Response** flows back: Database → Controller → Express → Proxy → Frontend
7. **Redux** updates state and re-renders UI

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in browser
3. Use the "Add New Product" form to create products
4. Browse products and add them to cart
5. Update quantities and remove items
6. Cart persists across browser refreshes

## 📚 Learning Concepts

This project demonstrates:
- **Full-Stack Development**: Frontend + Backend integration
- **State Management**: Redux for complex state
- **API Design**: RESTful endpoints
- **Database Design**: MongoDB schema design
- **React Hooks**: useState, useEffect, useSelector, useDispatch
- **Middleware**: Express middleware for CORS, parsing, errors
- **Proxy Configuration**: Development server proxying
- **Form Handling**: Controlled components and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Feel free to use and modify.
