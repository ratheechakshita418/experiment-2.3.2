// routes/product.routes.js - Product API routes
// This file defines the HTTP routes for product-related operations.
// Routes are organized by HTTP method and path, and delegate to controller functions.
// Express Router allows us to group related routes and export them as middleware.

import express from 'express'; // Express framework for routing
import { createProduct, findAllProducts } from '../controllers/product.controller.js'; // Controller functions that handle the business logic

// Create a new Express Router instance
// WHY Router: Allows us to define routes separately and mount them in the main app
const router = express.Router();

// GET /api/products - Fetch all products
// This route responds to GET requests to retrieve a list of all products from the database
// Delegates to findAllProducts controller function
router.get("/", findAllProducts);

// POST /api/products - Create a new product
// This route responds to POST requests to add a new product to the database
// Expects JSON body with name, price, image, description
// Delegates to createProduct controller function
router.post("/", createProduct);

// Export the router so it can be used in server.js
// This router will be mounted at /api/products in the main app
export default router;
