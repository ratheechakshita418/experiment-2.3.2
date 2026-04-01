// features/products/productsSlice.js - Redux slice for products state management
// This slice manages the global state for products, including fetching from API and adding new products.
// It uses createAsyncThunk for async operations and integrates with the backend API.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Redux Toolkit for async thunks and slices
import axios from "axios"; // HTTP client for API requests

// Async thunk for fetching all products from the backend
// WHAT: Makes API call to get products and updates Redux state
// WHY: Centralized product fetching with loading/error states
// HOW: Uses createAsyncThunk for async logic in Redux
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts", // Action type
  async (_, { rejectWithValue }) => {
    try {
      // Make GET request to products API
      const { data } = await axios.get("/api/products");
      return data; // Return data for fulfilled action
    } catch (error) {
      // Return error for rejected action
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for adding a new product
// WHAT: Creates new product via API and adds to Redux state
// WHY: Ensures UI updates immediately after successful creation
// HOW: Calls API, then returns new product for state update
export const addProduct = createAsyncThunk(
  "products/addProduct", // Action type
  async (productData, { rejectWithValue }) => {
    try {
      // Make POST request to create product
      const { data } = await axios.post("/api/products", productData);
      return data; // Return created product for fulfilled action
    } catch (error) {
      // Return error for rejected action
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial state for products slice
// WHAT: Defines the structure of products state
// WHY: Provides default values and shape for the state
const initialState = {
  products: [], // Array of product objects
  loading: false, // Loading state for async operations
  error: null // Error message if operations fail
};

// Create the products slice
// WHAT: Defines reducers and handles async thunk actions
// WHY: Manages products state changes in response to actions
const productsSlice = createSlice({
  name: "products", // Slice name for action types
  initialState, // Initial state defined above
  reducers: {
    // Reducer to clear error state
    // WHAT: Resets error to null
    // WHY: Allows manual error clearing if needed
    clearError: (state) => {
      state.error = null;
    }
  },
  // Handle async thunk actions
  extraReducers: (builder) => {
    builder
      // fetchProducts pending state
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; // Set loading to true
        state.error = null; // Clear any previous errors
      })
      // fetchProducts fulfilled state
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false; // Loading complete
        state.products = action.payload; // Update products with fetched data
        state.error = null; // Clear errors
      })
      // fetchProducts rejected state
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; // Loading complete
        state.error = action.payload; // Set error message
      })
      // addProduct pending state
      .addCase(addProduct.pending, (state) => {
        state.loading = true; // Set loading during creation
        state.error = null; // Clear errors
      })
      // addProduct fulfilled state
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false; // Loading complete
        state.products.push(action.payload); // Add new product to array
        state.error = null; // Clear errors
      })
      // addProduct rejected state
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false; // Loading complete
        state.error = action.payload; // Set error message
      });
  }
});

// Export actions
export const { clearError } = productsSlice.actions;

// Export reducer for store configuration
export default productsSlice.reducer;
