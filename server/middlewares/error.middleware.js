// middlewares/errorMiddleware.js - Error handling middleware
// Express middleware functions that handle errors in a centralized way.
// Middleware functions have access to req, res, next and can modify the request/response cycle.
// Error middleware is placed at the end of the middleware stack to catch errors from previous middleware/routes.

// Middleware to handle 404 Not Found errors
// WHAT: Catches requests to non-existent routes
// WHY: Provides a consistent error response for invalid URLs
// HOW: Express calls this when no route matches the request
export const notFound = (req, res, next) => {
    // Create a new Error object with a descriptive message
    // req.originalUrl is the original request URL
    const error = new Error(`Not Found - ${req.originalUrl}`);

    // Set the response status to 404 (Not Found)
    res.status(404);

    // Pass the error to the next middleware (errorHandler)
    // In Express, calling next() with an argument triggers error handling
    next(error);
};

// General error handling middleware
// WHAT: Catches and handles all errors that occur in the application
// WHY: Provides consistent error responses and prevents app crashes
// HOW: Express automatically calls this when an error is passed to next()
export const errorHandler = (err, req, res, next) => {
    // Determine the status code
    // If status is still 200 (default), change to 500 (Internal Server Error)
    // Otherwise, keep the existing status code (e.g., 400 from validation)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Set the response status
    res.status(statusCode);

    // Send JSON error response
    res.json({
        // Include the error message
        message: err.message,

        // Include stack trace only in development
        // WHY: Stack traces contain sensitive information, hide in production
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};
