// controllers/product.controller.js - Product business logic
// Controllers contain the logic for handling HTTP requests and responses.
// They process requests, interact with the database via models, and send responses.
// This separation keeps routes clean and business logic organized.

import { ProductModel } from "../models/Product.js"; // Product model for database operations

// Controller function to get all products
// WHAT: Retrieves all products from the database
// WHY: Frontend needs to display a list of available products
// HOW: Uses Mongoose find() to query all documents in the products collection
export const findAllProducts = async (req, res, next) => {
    try {
        // Query the database for all products
        // find({}) with empty object returns all documents
        const products = await ProductModel.find({});

        // Send the products as JSON response
        // Express automatically sets Content-Type to application/json
        res.json(products);
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        // next(error) allows Express to handle the error appropriately
        next(error);
    }
}

// Controller function to create a new product
// WHAT: Adds a new product to the database
// WHY: Allows admin/frontend to add new products to the catalog
// HOW: Validates input, creates new document, saves to database
export const createProduct = async (req, res, next) => {
    try {
        // Extract product data from request body
        // req.body contains the JSON data sent by the client
        const { name, price, image, description } = req.body;

        // Validate that all required fields are provided
        // WHY: Ensures data integrity and prevents incomplete products
        if (!name || !price || !image || !description) {
            // Set HTTP status to 400 (Bad Request)
            res.status(400);
            // Throw error that will be caught and handled by error middleware
            throw new Error("All fields are required");
        }

        // Create a new product document in the database
        // ProductModel.create() validates data against schema and saves
        const created = await ProductModel.create({ name, price, image, description });

        // Send success response with the created product
        // Status 201 = Created, indicates successful resource creation
        res.status(201).json(created);
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
}
