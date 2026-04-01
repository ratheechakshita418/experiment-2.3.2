// App.jsx - Main application component with routing
// This is the root component of the React application.
// It sets up React Router for client-side navigation between different pages.
// The App component is rendered by index.js and serves as the entry point for the UI.

import React from "react"; // React for building components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router for navigation
import Navbar from "./components/Navbar"; // Navigation component
import ProductList from "./components/ProductList"; // Component to display product catalog
import Cart from "./components/Cart"; // Component to display shopping cart
import AddProductForm from "./components/AddProductForm"; // Component to add new products
import {
    Container, // Material-UI container for consistent layout
    Box // Layout component
} from "@mui/material";

// App component - the main component with routing
// WHAT: Sets up routing and renders the application with navigation
// WHY: Enables client-side navigation between different app sections
// HOW: Uses React Router to define routes for each page
function App() {
    return (
        // Router component enables client-side routing
        // WHAT: Wraps the entire app to provide routing context
        // WHY: Required for React Router to work throughout the app
        <Router>
            {/* Navigation bar - appears on all pages */}
            <Navbar />

            {/* Container provides consistent max-width and centering */}
            <Container>
                {/* Routes define which component to render for each path */}
                <Routes>
                    {/* Home route - shows product catalog */}
                    <Route
                        path="/"
                        element={<ProductList />}
                    />

                    {/* Cart route - shows shopping cart */}
                    <Route
                        path="/cart"
                        element={<Cart />}
                    />

                    {/* Add product route - shows form to add new products */}
                    <Route
                        path="/add-product"
                        element={<AddProductForm />}
                    />
                </Routes>
            </Container>
        </Router>
    );
}

// Export the App component for use in index.js
export default App;
