// components/AddProductForm.jsx - Form component to add new products
// This component provides a form for users to add new products to the catalog.
// It uses controlled components in React - form inputs are controlled by component state.
// Demonstrates form handling, validation, and API calls with Axios.

import React, { useState } from "react"; // useState for form state management
import { useDispatch } from "react-redux"; // useDispatch for Redux actions
import { addProduct } from "../features/products/productsSlice"; // Action to add product
import { useNavigate } from "react-router-dom"; // Navigation hook
import {
    Container, // Layout container
    Typography, // Text component
    TextField, // Input fields
    Button, // Submit button
    Alert, // Success/error messages
    Box // Layout component
} from "@mui/material";

// AddProductForm component - form to create new products
// WHAT: Provides input fields for product details and submits via Redux
// WHY: Allows adding new products with automatic UI updates
// HOW: Uses controlled inputs, validates data, dispatches Redux action
const AddProductForm = () => {
    // useDispatch hook provides the dispatch function
    // WHAT: Allows dispatching actions to update Redux state
    // WHY: Needed to add products to the global state
    const dispatch = useDispatch();

    // useNavigate hook for programmatic navigation
    // WHAT: Allows redirecting to other routes after form submission
    // WHY: After adding product, navigate back to products page
    const navigate = useNavigate();
    // State for form data - controlled components
    // WHAT: Stores current values of all form inputs
    // WHY: React controls the input values, enabling validation and dynamic updates
    // HOW: useState initializes with empty strings
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        description: ""
    });

    // State for success/error messages
    // WHAT: Stores feedback messages for user
    // WHY: Provides feedback on form submission results
    const [message, setMessage] = useState({ type: "", text: "" });

    // Handler for input field changes
    // WHAT: Updates formData state when user types in inputs
    // WHY: Keeps form data in sync with user input (controlled components)
    // HOW: Uses computed property name to update specific field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handler for form submission
    // WHAT: Validates form data and sends POST request to create product
    // WHY: Processes the form when user clicks submit
    // HOW: Prevents default form behavior, validates, makes API call
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        // Basic validation - check all fields are filled
        // WHAT: Ensures required fields are not empty
        // WHY: Prevents invalid data from being sent to server
        if (!formData.name || !formData.price || !formData.image || !formData.description) {
            setMessage({ type: "error", text: "All fields are required" });
            return;
        }

        // Validate price is a positive number
        // WHAT: Checks price is valid number and positive
        // WHY: Price should be a valid monetary value
        const priceNum = parseFloat(formData.price);
        if (isNaN(priceNum) || priceNum <= 0) {
            setMessage({ type: "error", text: "Price must be a positive number" });
            return;
        }

        try {
            // Clear previous messages
            setMessage({ type: "", text: "" });

            // Prepare data for API - convert price to number
            const productData = {
                ...formData,
                price: priceNum
            };

            // Dispatch addProduct action (handles API call and state update)
            // WHAT: Sends product data to Redux thunk
            // WHY: Centralized product creation with automatic state updates
            // HOW: Redux thunk calls API and updates products state
            await dispatch(addProduct(productData)).unwrap();

            // Show success message
            setMessage({ type: "success", text: "Product added successfully!" });

            // Reset form after successful submission
            // WHAT: Clears all input fields
            // WHY: Allows adding another product easily
            setFormData({
                name: "",
                price: "",
                image: "",
                description: ""
            });

            // Navigate back to products page after short delay
            // WHAT: Redirects user to see the newly added product
            // WHY: Provides immediate feedback by showing updated product list
            // HOW: useNavigate hook changes the current route
            setTimeout(() => {
                navigate("/");
            }, 1500); // Delay to show success message

        } catch (error) {
            // Handle Redux thunk errors
            // WHAT: Shows error message if action fails
            // WHY: Provides feedback when something goes wrong
            setMessage({ type: "error", text: error });
        }
    };

    // JSX render
    return (
        <Container sx={{ mt: 4, maxWidth: 600 }}>
            {/* Form title */}
            <Typography variant="h4" mb={3}>Add New Product</Typography>

            {/* Success/Error message display */}
            {message.text && (
                <Alert severity={message.type} sx={{ mb: 2 }}>
                    {message.text}
                </Alert>
            )}

            {/* Form element */}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Product name input */}
                <TextField
                    label="Product Name" // Label for accessibility
                    name="name" // Matches formData property
                    value={formData.name} // Controlled value
                    onChange={handleChange} // Change handler
                    required // HTML5 validation
                    fullWidth // Full width styling
                />

                {/* Product price input */}
                <TextField
                    label="Price"
                    name="price"
                    type="number" // Number input
                    value={formData.price}
                    onChange={handleChange}
                    required
                    fullWidth
                    inputProps={{ min: "0", step: "0.01" }} // Min value and decimal step
                />

                {/* Product image URL input */}
                <TextField
                    label="Image URL"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="https://example.com/image.jpg" // Helper text
                />

                {/* Product description input */}
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    fullWidth
                    multiline // Textarea for longer text
                    rows={3} // Number of rows
                />

                {/* Submit button */}
                <Button
                    type="submit" // Form submission
                    variant="contained" // Filled button
                    sx={{ mt: 2, py: 1.5 }} // Extra margin and padding
                >
                    Add Product
                </Button>
            </Box>
        </Container>
    );
};

// Export component for use in routing
export default AddProductForm;
