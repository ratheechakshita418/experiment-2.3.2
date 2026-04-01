// config/db.js - Database connection configuration
// This file handles the connection to MongoDB using Mongoose.
// Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
// It provides a schema-based solution to model application data.

import mongoose from "mongoose"; // Mongoose is the MongoDB object modeling tool

// Asynchronous function to connect to MongoDB
// WHY async: Database connections are I/O operations that take time, so we use async/await
export const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the connection string from environment variables
        // process.env.MONGO_URI comes from the .env file (e.g., mongodb://localhost:27017/shopping-cart)
        // useNewUrlParser and useUnifiedTopology are options for better compatibility
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Use the new URL parser
            useUnifiedTopology: true // Use the new server discovery and monitoring engine
        });

        // If connection is successful, log the host
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        // If connection fails, log the error and exit the process
        // WHY exit: If we can't connect to the database, the app can't function properly
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1); // Exit with error code 1
    }
};
