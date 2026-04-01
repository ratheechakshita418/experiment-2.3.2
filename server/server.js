// server.js - Main entry point for the Express server
// This file sets up the Express application, configures middleware, connects to the database,
// and starts the server. It acts as the central hub for all backend operations.

import express from 'express'; // Express is a web framework for Node.js that simplifies building APIs
import cors from 'cors'; // CORS (Cross-Origin Resource Sharing) allows the frontend to make requests to this server
import dotenv from 'dotenv'; // dotenv loads environment variables from a .env file
import { connectDB } from './config/db.js'; // Custom function to connect to MongoDB
import productRoutes from './routes/product.routes.js'; // Routes for product-related API endpoints
import { notFound, errorHandler } from './middlewares/error.middleware.js'; // Middleware for handling errors

// Load environment variables from .env file
// This is important for security - sensitive data like database URLs are not hardcoded
dotenv.config();

// Connect to MongoDB database
// This establishes the connection to the database before starting the server
connectDB();

// Create an Express application instance
// This is the main app object that handles all HTTP requests
const app = express();

// Enable CORS for all routes
// WHY: The frontend (React app) runs on a different port (3000) than the backend (5000).
// Browsers block cross-origin requests by default for security. CORS allows this.
app.use(cors());

// Parse incoming JSON requests
// WHY: When the frontend sends data (e.g., POST requests), it's in JSON format.
// express.json() converts the JSON string into a JavaScript object that we can use.
app.use(express.json());

// Mount product routes at /api/products
// This means all routes defined in productRoutes will be prefixed with /api/products
// Example: GET /api/products will fetch all products
app.use("/api/products", productRoutes);

// Basic route for testing if the server is running
// Visit http://localhost:5000 to see "API is running"
app.get("/", (req, res) => {
    res.send("API is running");
});

// Error handling middleware
// These catch any errors that occur in the routes and send appropriate responses
app.use(notFound); // Handles 404 errors (route not found)
app.use(errorHandler); // Handles other errors (500 internal server error)

// Get the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
// The callback function runs once the server is successfully started
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
