// index.js - Application entry point
// This file is the entry point for the React application.
// It renders the App component into the DOM and wraps it with Redux Provider.
// The Provider makes the Redux store available to all components in the app.

import React from "react"; // React library for building UI
import ReactDOM from "react-dom/client"; // ReactDOM for rendering to DOM
import { Provider } from "react-redux"; // Redux Provider component
import { store } from "./app/store"; // Redux store configuration
import App from "./App"; // Main App component

// Create a root container for React 18's concurrent features
// WHAT: Gets the DOM element with id 'root' and creates a React root
// WHY: React 18 uses createRoot for concurrent rendering capabilities
// HOW: document.getElementById finds the div in public/index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application
// WHAT: Renders the App component wrapped in Redux Provider
// WHY: Provider gives all components access to the Redux store
// HOW: JSX syntax renders the component tree to the DOM
root.render(
    // Provider component from react-redux
    // WHAT: Makes Redux store available to all child components
    // WHY: Components need access to dispatch actions and select state
    // HOW: Takes store as prop and provides context to children
    <Provider store={store}>
        <App />
    </Provider>
);
