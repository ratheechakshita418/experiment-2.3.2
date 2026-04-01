// components/ProductList.jsx - Component to display list of products
// This component fetches products from Redux state and displays them in a grid.
// It uses Redux for state management instead of local state, ensuring automatic updates
// when products are added elsewhere in the app. Shows loading and error states.

import React, { useEffect } from "react"; // React hooks for effects
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { fetchProducts } from "../features/products/productsSlice"; // Action to fetch products
import ProductCard from "./ProductCard"; // Component to display individual products
import {
    Grid, // Material-UI grid layout
    CircularProgress, // Loading spinner
    Alert, // Error message display
    Container, // Layout container
    Typography // Text component
} from "@mui/material";

// ProductList component - displays all products from Redux state
// WHAT: Fetches and displays products in a responsive grid
// WHY: Central product catalog that updates automatically when products change
// HOW: Uses Redux selectors to read products state and dispatches fetch on mount
const ProductList = () => {
    // useDispatch hook to dispatch Redux actions
    // WHAT: Allows dispatching actions to update Redux state
    // WHY: Needed to fetch products when component mounts
    const dispatch = useDispatch();

    // useSelector hooks to access products state from Redux store
    // WHAT: Extracts products data, loading state, and errors from Redux
    // WHY: Component needs to display products and handle loading/error states
    // HOW: Selects specific slices of the Redux state
    const { products, loading, error } = useSelector((state) => state.products);

    // useEffect hook to fetch products when component mounts
    // WHAT: Dispatches fetchProducts action on component mount
    // WHY: Need to load products data when the component first renders
    // HOW: Empty dependency array [] means runs only once on mount
    useEffect(() => {
        dispatch(fetchProducts()); // Fetch products from API
    }, [dispatch]); // Include dispatch in dependencies (React rule)

    // Conditional rendering based on state
    // WHAT: Shows different UI based on current loading/error state
    // WHY: Provides appropriate feedback to user during data fetching

    // Show loading spinner while fetching
    if (loading) return (
        <Container sx={{ mt: 4 }}>
            <CircularProgress sx={{ mt: 4 }} />
        </Container>
    );

    // Show error message if fetch failed
    if (error) return (
        <Container sx={{ mt: 4 }}>
            <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
        </Container>
    );

    // Main render: display products grid
    return (
        // Container provides consistent spacing and max width
        <Container sx={{ mt: 4 }}>
            {/* Page title */}
            <Typography variant="h4" mb={2}>Products</Typography>

            {/* Grid layout for responsive product display */}
            <Grid container spacing={2}>
                {/* Check if products array has items */}
                {products.length ? (
                    // Map over products and render ProductCard for each
                    products.map((product) => (
                        // Grid item with responsive breakpoints
                        // xs=12: full width on extra small screens
                        // sm=6: half width on small screens
                        // md=4: third width on medium screens
                        <Grid item key={product._id} xs={12} sm={6} md={4}>
                            {/* Render ProductCard with product data */}
                            <ProductCard product={product} />
                        </Grid>
                    ))
                ) : (
                    // Show message if no products found
                    <Container sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6">No products found.</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Add some products using the "Add Product" page.
                        </Typography>
                    </Container>
                )}
            </Grid>
        </Container>
    );
};

// Export component for use in routing
export default ProductList;
