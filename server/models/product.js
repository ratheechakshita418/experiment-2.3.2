// models/Product.js - Product data model
// This file defines the structure (schema) of a Product document in MongoDB.
// A schema defines the shape of documents within a collection.
// Mongoose schemas provide structure, validation, and middleware for MongoDB documents.

import mongoose from "mongoose"; // Mongoose for MongoDB object modeling

// Define the Product schema
// A schema maps to a MongoDB collection and defines the shape of documents within that collection
const productSchema = new mongoose.Schema(
    {
        // name: The product's name (e.g., "Wireless Headphones")
        // type: String - specifies the data type
        // required: true - this field must be provided when creating a product
        name: { type: String, required: true },

        // price: The product's price in dollars (e.g., 99.99)
        // type: Number - for numerical values
        // required: true - price is mandatory
        price: { type: Number, required: true },

        // image: URL or path to the product image
        // type: String - for storing URLs or file paths
        // required: true - image is needed for display
        image: { type: String, required: true },

        // description: Detailed description of the product
        // type: String - for text content
        // required: true - description helps users understand the product
        description: { type: String, required: true }
    },
    {
        // timestamps: true automatically adds createdAt and updatedAt fields
        // WHY: Useful for tracking when products were added or last modified
        timestamps: true
    }
);

// Create and export the Product model
// The model provides an interface to the database for creating, querying, updating, deleting products
// "Product" is the collection name in MongoDB (mongoose will pluralize it to "products")
export const ProductModel = mongoose.model("Product", productSchema);
