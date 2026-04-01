// app/store.js - Redux store configuration
// The Redux store is the central state container for the entire React application.
// It holds the application state and allows components to access and update state in a predictable way.
// Redux Toolkit simplifies store setup with configureStore.

import { configureStore } from "@reduxjs/toolkit"; // configureStore from Redux Toolkit
import cartReducer from "../features/cart/cartSlice"; // Reducer for cart state management
import productsReducer from "../features/products/productsSlice"; // Reducer for products state management

// Create and configure the Redux store
// WHAT: The store holds all application state and provides methods to update it
// WHY: Centralized state management makes data flow predictable and debuggable
// HOW: configureStore automatically sets up Redux DevTools and combines reducers
export const store = configureStore({
  // reducer: An object mapping state slices to their reducers
  // cart: cartReducer handles all cart-related state changes
  // products: productsReducer handles all product-related state changes
  reducer: {
    cart: cartReducer,
    products: productsReducer
  },

  // devTools: Enable Redux DevTools in development
  // WHY: DevTools allow inspecting state, actions, and time-travel debugging
  // HOW: Automatically disabled in production for security
  devTools: process.env.NODE_ENV !== "production"
});
