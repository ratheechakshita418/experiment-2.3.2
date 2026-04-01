// setupProxy.js - Development proxy configuration
// This file configures a proxy for API requests during development.
// It allows the React development server to proxy API calls to the backend server.
// This solves CORS issues and allows the frontend to call backend APIs seamlessly.

const { createProxyMiddleware } = require("http-proxy-middleware"); // Import proxy middleware

// Export a function that configures the proxy
// WHAT: Sets up proxy middleware for the development server
// WHY: Frontend runs on port 3000, backend on 5000 - proxy allows cross-origin requests
// HOW: Intercepts requests to /api and forwards them to backend
module.exports = function (app) {
    // Configure proxy for all routes starting with /api
    // WHAT: Any request to /api/* gets proxied to the backend
    // WHY: Allows axios.get("/api/products") to work without full URLs
    // HOW: createProxyMiddleware creates the proxy handler
    app.use(
        "/api", // Match all routes starting with /api
        createProxyMiddleware({
            target: "http://localhost:5000", // Backend server URL
            changeOrigin: true // Changes the origin header to match target
        })
    );
};
