// components/Cart.jsx - Component to display and manage shopping cart
// This component shows all items in the cart, allows quantity updates, item removal,
// and displays the total price. It uses Redux to access cart state and dispatch actions.
// Demonstrates useSelector for reading state and useDispatch for updating state.

import React from "react"; // React for component building
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import {
    removeFromCart, // Action to remove item from cart
    updateQuantity, // Action to update item quantity
    clearCart // Action to clear all items
} from "../features/cart/cartSlice"; // Cart slice actions
import {
    Container, // Layout container
    Typography, // Text component
    Grid, // Grid layout
    Button, // Button component
    TextField, // Input field for quantity
    Card, // Card container
    CardContent, // Card content area
    CardMedia, // Media container for images
    CardActions, // Card action area
    Alert // Alert component for messages
} from "@mui/material";

// Cart component - displays shopping cart contents
// WHAT: Shows cart items, allows quantity changes, removal, and clearing
// WHY: Users need to view and manage their selected products
// HOW: Uses Redux selectors to read cart state and dispatches actions to update
const Cart = () => {
    // useDispatch hook provides the dispatch function
    // WHAT: Allows dispatching actions to update Redux state
    // WHY: Needed to remove items, update quantities, clear cart
    const dispatch = useDispatch();

    // useSelector hook to access cart state from Redux store
    // WHAT: Extracts cartItems from the Redux state
    // WHY: Component needs to display current cart contents
    // HOW: state.cart accesses the cart slice, destructures cartItems
    const { cartItems } = useSelector((state) => state.cart);

    // Calculate total price of all items in cart
    // WHAT: Sums up (price * quantity) for all cart items
    // WHY: Shows users the total cost of their cart
    // HOW: reduce() accumulates the total, starting from 0
    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    // Conditional rendering: show empty cart message if no items
    // WHAT: Displays alert when cart is empty
    // WHY: Provides feedback when there are no items to show
    if (!cartItems.length) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="info">Your cart is empty.</Alert>
            </Container>
        );
    }

    // Main render: display cart items and total
    return (
        <Container sx={{ mt: 4 }}>
            {/* Cart title */}
            <Typography variant="h4" mb={2}>Shopping Cart</Typography>

            {/* Grid container for cart items */}
            <Grid container spacing={2}>
                {/* Map over cart items to display each one */}
                {cartItems.map((item) => (
                    <Grid item key={item._id} xs={12}>
                        {/* Card for each cart item with flex layout */}
                        <Card sx={{ display: "flex" }}>
                            {/* Product image */}
                            <CardMedia
                                component="img"
                                sx={{ width: 150 }} // Fixed width for image
                                image={item.image}
                                alt={item.name}
                            />

                            {/* Product details and quantity input */}
                            <CardContent sx={{ flex: 1 }}>
                                {/* Product name */}
                                <Typography variant="h6">{item.name}</Typography>

                                {/* Product price */}
                                <Typography>${item.price.toFixed(2)}</Typography>

                                {/* Quantity input field */}
                                <TextField
                                    label="Quantity" // Label for accessibility
                                    type="number" // Number input
                                    value={item.qty} // Current quantity value
                                    onChange={(e) => {
                                        // Ensure quantity is at least 1
                                        const qty = Math.max(1, Number(e.target.value));
                                        // Dispatch updateQuantity action
                                        dispatch(updateQuantity({ id: item._id, qty }));
                                    }}
                                    inputProps={{ min: 1 }} // HTML min attribute
                                    sx={{ width: 120, mt: 1 }} // Styling
                                />
                            </CardContent>

                            {/* Action buttons */}
                            <CardActions>
                                {/* Remove button */}
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => dispatch(removeFromCart(item._id))}
                                >
                                    Remove
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Total price display */}
            <Typography variant="h5" sx={{ mt: 3 }}>
                Total: ${total.toFixed(2)}
            </Typography>

            {/* Clear cart button */}
            <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(clearCart())}
                sx={{ mt: 2 }}
            >
                Clear Cart
            </Button>
        </Container>
    );
};

// Export component for use in App.jsx
export default Cart;
