// components/ProductCard.jsx - Component to display individual product
// This component renders a single product with its image, details, and "Add to Cart" button.
// It uses Material-UI components for consistent styling and Redux for state management.
// The component receives a product object as props and dispatches actions to add items to cart.

import React from "react"; // React for building UI components
import { useDispatch } from "react-redux"; // useDispatch hook to dispatch Redux actions
import { addToCart } from "../features/cart/cartSlice"; // Action creator to add items to cart
import {
    Card, // Material-UI card container
    CardActions, // Container for card action buttons
    CardContent, // Container for card content
    CardMedia, // Container for media (images)
    Button, // Material-UI button component
    Typography // Material-UI text component
} from "@mui/material";

// ProductCard component receives a product object as props
// WHAT: Displays product information in a card format
// WHY: Provides a consistent, attractive way to show products
// HOW: Uses Material-UI Card components and Redux dispatch
const ProductCard = ({ product }) => {
    // useDispatch hook provides access to the Redux dispatch function
    // WHAT: Allows dispatching actions to update the Redux store
    // WHY: Needed to add products to the cart state
    const dispatch = useDispatch();

    // Handler function for the "Add to Cart" button click
    // WHAT: Dispatches the addToCart action with the product
    // WHY: When user clicks button, product should be added to cart
    // HOW: Calls dispatch with the addToCart action and product as payload
    const onAdd = () => {
        dispatch(addToCart(product));
    };

    // JSX return - renders the product card
    return (
        // Card component from Material-UI - provides card styling
        <Card sx={{ maxWidth: 345 }}>
            {/* CardMedia displays the product image */}
            <CardMedia
                component="img" // Renders as an <img> element
                height="200" // Fixed height for consistent display
                image={product.image} // Image URL from product data
                alt={product.name} // Alt text for accessibility
            />

            {/* CardContent contains the product details */}
            <CardContent>
                {/* Product name as heading */}
                <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                </Typography>

                {/* Product price formatted to 2 decimal places */}
                <Typography variant="subtitle1" color="text.secondary">
                    ${product.price.toFixed(2)}
                </Typography>

                {/* Product description */}
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>

            {/* CardActions contains the action buttons */}
            <CardActions>
                {/* Add to Cart button */}
                <Button
                    size="small" // Small button size
                    onClick={onAdd} // Calls onAdd function when clicked
                    variant="contained" // Filled button style
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

// Export the component for use in other files
export default ProductCard;
