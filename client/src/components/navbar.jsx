// components/Navbar.jsx - Navigation component for the shopping cart app
// This component provides navigation links between different pages.
// It uses React Router's Link component for client-side navigation.
// Demonstrates navigation patterns in single-page applications.

import React from "react"; // React for building components
import { Link, useLocation } from "react-router-dom"; // Link for navigation, useLocation for active state
import {
    AppBar, // Top navigation bar
    Toolbar, // Container for navigation items
    Typography, // Text component
    Button, // Navigation buttons
    Box // Layout component
} from "@mui/material";

// Navbar component - navigation bar with links to different pages
// WHAT: Provides navigation between Products, Cart, and Add Product pages
// WHY: Allows users to switch between different app sections
// HOW: Uses React Router Link components with Material-UI styling
const Navbar = () => {
    // useLocation hook provides current route information
    // WHAT: Gets the current pathname for active link styling
    // WHY: Highlights the current page in navigation
    const location = useLocation();

    // Helper function to check if link is active
    // WHAT: Compares current path with link path
    // WHY: Applies active styling to current page link
    const isActive = (path) => location.pathname === path;

    return (
        // AppBar provides the top navigation bar styling
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                {/* App title - links to home/products page */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        Shopping Cart App
                    </Link>
                </Typography>

                {/* Navigation buttons container */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Products page link */}
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{
                            // Apply background color if active
                            backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                        }}
                    >
                        Products
                    </Button>

                    {/* Cart page link */}
                    <Button
                        color="inherit"
                        component={Link}
                        to="/cart"
                        sx={{
                            // Apply background color if active
                            backgroundColor: isActive('/cart') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                        }}
                    >
                        Cart
                    </Button>

                    {/* Add Product page link */}
                    <Button
                        color="inherit"
                        component={Link}
                        to="/add-product"
                        sx={{
                            // Apply background color if active
                            backgroundColor: isActive('/add-product') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                        }}
                    >
                        Add Product
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

// Export component for use in App.jsx
export default Navbar;
