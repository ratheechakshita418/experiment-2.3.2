# Redux State Management

## 🤔 What is Redux?

Redux is a **predictable state container** for JavaScript applications. It helps manage complex application state in a consistent way.

### Why Redux?
- **Predictable**: State changes follow strict patterns
- **Debuggable**: Time-travel debugging with DevTools
- **Testable**: Pure functions are easy to test
- **Maintainable**: Clear separation of concerns

### Redux vs Local State
```javascript
// Local State (useState) - Simple, component-specific
const [count, setCount] = useState(0);

// Redux State - Global, app-wide, complex interactions
const cartItems = useSelector(state => state.cart.cartItems);
```

## 🏗️ Redux Architecture

### Core Concepts

```
Action → Reducer → Store → Component
   ↑                           ↓
   └────────── Dispatch ───────┘
```

#### 1. Actions
Actions are **plain JavaScript objects** that describe what happened.

```javascript
// Action object structure
{
  type: "ADD_TO_CART",    // Required: describes the action
  payload: productData    // Optional: data for the action
}
```

#### 2. Reducers
Reducers are **pure functions** that specify how state changes in response to actions.

```javascript
// Pure function: same input → same output
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    default:
      return state;
  }
};
```

#### 3. Store
The store is the **single source of truth** that holds the application state.

```javascript
const store = createStore(cartReducer);
```

## 🛠️ Redux Toolkit

Redux Toolkit (RTK) simplifies Redux setup and eliminates boilerplate.

### Why Redux Toolkit?
- **Less code**: Generates actions and reducers automatically
- **Immutable updates**: Built-in Immer for mutation-like syntax
- **DevTools ready**: Automatic setup
- **Modern patterns**: Thunks included

### createSlice

```javascript
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",           // Slice name
  initialState: {         // Initial state
    cartItems: []
  },
  reducers: {             // Reducer functions
    addToCart: (state, action) => {
      // Mutation-like syntax (Immer handles immutability)
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item._id !== action.payload
      );
    }
  }
});

// Auto-generated actions
export const { addToCart, removeFromCart } = cartSlice.actions;

// Auto-generated reducer
export default cartSlice.reducer;
```

## 🔄 Data Flow in Our App

### Adding an Item to Cart

```
1. User clicks "Add to Cart" button
2. ProductCard calls: dispatch(addToCart(product))
3. Redux store calls cartSlice reducer
4. Reducer updates state immutably
5. Components using cart state re-render
6. localStorage saves updated cart
```

### Complete Flow Diagram

```
User Action → Component Event → dispatch(action) → Store → Reducer → New State → Re-render → UI Update
```

## 📁 Our Redux Implementation

### Store Configuration (`store.js`)

```javascript
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer  // cart slice reducer
  },
  devTools: process.env.NODE_ENV !== "production"  // Enable DevTools in dev
});
```

### Cart Slice (`cartSlice.js`)

#### State Structure
```javascript
{
  cartItems: [
    {
      _id: "64f1a2b3...",
      name: "Product Name",
      price: 29.99,
      image: "url.jpg",
      description: "Product description",
      qty: 2
    }
  ]
}
```

#### Actions & Reducers

1. **addToCart**
   - **Purpose**: Add product to cart or increase quantity
   - **Logic**: Check if exists → update qty or add new
   - **Persistence**: Save to localStorage

2. **removeFromCart**
   - **Purpose**: Remove item completely from cart
   - **Logic**: Filter out item by ID
   - **Persistence**: Update localStorage

3. **updateQuantity**
   - **Purpose**: Change quantity of existing item
   - **Logic**: Map and update specific item
   - **Persistence**: Update localStorage

4. **clearCart**
   - **Purpose**: Remove all items
   - **Logic**: Set cartItems to empty array
   - **Persistence**: Clear localStorage

### localStorage Integration

#### Why localStorage?
- **Persistence**: Cart survives browser refresh/close
- **User Experience**: No lost cart data
- **Offline Capability**: Works without internet

#### Implementation
```javascript
// Load from storage on app start
const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

// Save to storage on every change
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch {
    // Handle storage errors
  }
};
```

## 🔗 Connecting Redux to React

### Provider (index.js)
```javascript
import { Provider } from "react-redux";
import { store } from "./app/store";

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### useSelector - Reading State
```javascript
import { useSelector } from "react-redux";

const Cart = () => {
  // Select cart items from Redux state
  const { cartItems } = useSelector(state => state.cart);

  // Component logic...
};
```

### useDispatch - Dispatching Actions
```javascript
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductCard = () => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <button onClick={handleAddToCart}>Add to Cart</button>
  );
};
```

## 🐛 Redux DevTools

### What are DevTools?
- **Time Travel**: See state at any point in time
- **Action Log**: View all dispatched actions
- **State Inspection**: Examine current state
- **Hot Reloading**: Update reducers without refresh

### Setup in Our App
```javascript
// In store.js
export const store = configureStore({
  reducer: { cart: cartReducer },
  devTools: process.env.NODE_ENV !== "production"  // Auto-enabled in dev
});
```

### How to Use
1. Open browser DevTools
2. Go to "Redux" tab
3. See state changes in real-time
4. Click actions to time-travel

## 🧪 Testing Redux Logic

### Testing Reducers
```javascript
import cartReducer, { addToCart } from "./cartSlice";

test("should add item to empty cart", () => {
  const initialState = { cartItems: [] };
  const product = { _id: "1", name: "Test" };

  const result = cartReducer(initialState, addToCart(product));

  expect(result.cartItems).toHaveLength(1);
  expect(result.cartItems[0]).toEqual({ ...product, qty: 1 });
});
```

## 🔧 Best Practices

### 1. Keep Actions Simple
```javascript
// Good
dispatch(addToCart(product));

// Avoid
dispatch({ type: "ADD_TO_CART", payload: product });
```

### 2. Use Selectors for Computed Values
```javascript
// In slice or separate selectors file
export const selectCartTotal = state =>
  state.cart.cartItems.reduce((total, item) =>
    total + item.price * item.qty, 0
  );

// In component
const total = useSelector(selectCartTotal);
```

### 3. Structure Large Apps
```
features/
├── cart/
│   ├── cartSlice.js
│   ├── selectors.js
│   └── cartAPI.js
├── products/
│   ├── productSlice.js
│   └── productAPI.js
```

### 4. Handle Async Operations
```javascript
// Using createAsyncThunk
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const response = await api.get("/products");
    return response.data;
  }
);
```

## 🚀 Advanced Patterns

### 1. Redux Saga/Middleware
For complex async logic and side effects.

### 2. Normalized State
For complex data relationships.

### 3. Redux Persist
Automatic persistence to localStorage/sessionStorage.

### 4. Redux Toolkit Query (RTK Query)
For API state management and caching.

## 📚 Learning Resources

- [Redux Official Docs](https://redux.js.org/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [React Redux](https://react-redux.js.org/)

## 🎯 Key Takeaways

1. **Redux manages global state** predictably
2. **Redux Toolkit reduces boilerplate** significantly
3. **Actions describe what happened**, reducers update state
4. **Components dispatch actions** and select state
5. **DevTools enable debugging** and time-travel
6. **localStorage adds persistence** for better UX
