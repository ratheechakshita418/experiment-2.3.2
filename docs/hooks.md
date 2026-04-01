# React Hooks Guide

## 🎣 What are React Hooks?

Hooks are **functions that let you use state and lifecycle features** in functional components. They were introduced in React 16.8 to allow stateful logic reuse without class components.

### Why Hooks?
- **No classes**: Write components as functions
- **Reusable logic**: Extract stateful logic into custom hooks
- **Cleaner code**: Less boilerplate than class components
- **Better performance**: Optimized for React's internals

## 📋 Built-in Hooks Used in Our App

### 1. useState - State Management

**What it does**: Creates state variables in functional components.

**Why we use it**: Track component-specific data that changes over time.

**How it works**:
```javascript
const [state, setState] = useState(initialValue);
```

#### In Our App

**ProductList.jsx** - Managing products and loading state:
```javascript
const [products, setProducts] = useState([]);      // Product array
const [loading, setLoading] = useState(true);      // Loading indicator
const [error, setError] = useState("");            // Error messages
```

**AddProductForm.jsx** - Form input state:
```javascript
const [formData, setFormData] = useState({
  name: "",
  price: "",
  image: "",
  description: ""
});
```

**Key Concepts**:
- **State updates are asynchronous**
- **State is immutable** - always return new values
- **Initial state** can be a value or function (for expensive computations)

### 2. useEffect - Side Effects

**What it does**: Performs side effects in functional components.

**Why we use it**: Handle component lifecycle events like data fetching, subscriptions, DOM manipulation.

**How it works**:
```javascript
useEffect(() => {
  // Effect logic
  return () => {
    // Cleanup function (optional)
  };
}, [dependencies]); // Dependency array
```

#### In Our App

**ProductList.jsx** - Fetch products on component mount:
```javascript
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/products");
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []); // Empty array = run only once on mount
```

**Dependency Array Options**:
- `[]` - Run once on mount
- `[variable]` - Run when variable changes
- No array - Run after every render (avoid!)

### 3. useSelector - Redux State Reading

**What it does**: Extracts data from the Redux store state.

**Why we use it**: Access global state managed by Redux.

**How it works**:
```javascript
const data = useSelector(selectorFunction);
```

#### In Our App

**Cart.jsx** - Access cart items and calculate total:
```javascript
const { cartItems } = useSelector((state) => state.cart);

// Equivalent to:
// const cartItems = useSelector(state => state.cart.cartItems);
```

**Selector Functions**:
- **Simple property access**: `state => state.cart.cartItems`
- **Computed values**: Can include calculations
- **Memoized selectors**: For performance with `createSelector`

### 4. useDispatch - Redux Action Dispatching

**What it does**: Returns the dispatch function from Redux store.

**Why we use it**: Send actions to update Redux state.

**How it works**:
```javascript
const dispatch = useDispatch();
dispatch(action);
```

#### In Our App

**ProductCard.jsx** - Add product to cart:
```javascript
const dispatch = useDispatch();

const onAdd = () => {
  dispatch(addToCart(product));
};
```

**Cart.jsx** - Multiple dispatch actions:
```javascript
const dispatch = useDispatch();

const handleRemove = (id) => dispatch(removeFromCart(id));
const handleUpdateQty = (id, qty) => dispatch(updateQuantity({ id, qty }));
const handleClear = () => dispatch(clearCart());
```

## 🔄 Hook Lifecycle

### Component Mount → Update → Unmount

```
Component Mount
      ↓
useEffect (with []) runs
      ↓
State changes trigger re-render
      ↓
useEffect (with [deps]) runs when deps change
      ↓
Component Unmount
      ↓
useEffect cleanup functions run
```

### Our App's Hook Flow

```
App loads → ProductList mounts → useEffect fetches products → State updates → Re-render with products

User clicks Add to Cart → ProductCard dispatches action → Redux state updates → Cart component re-renders
```

## 🎯 Hook Rules & Best Practices

### Rules of Hooks
1. **Only call hooks at the top level** - Not inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Components or custom hooks
3. **Hook names start with "use"** - Convention for custom hooks

### Best Practices

#### 1. Custom Hooks for Reusable Logic
```javascript
// Custom hook for API calls
function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // API logic
  };

  return { products, loading, refetch: fetchProducts };
}

// Usage in component
const { products, loading } = useProducts();
```

#### 2. Dependency Arrays
```javascript
// ✅ Correct: Include all dependencies
useEffect(() => {
  console.log(count, name);
}, [count, name]);

// ❌ Wrong: Missing dependencies
useEffect(() => {
  console.log(count, name);
}, []); // ESLint warning

// ❌ Wrong: Unnecessary dependencies
useEffect(() => {
  console.log("Component mounted");
}, [count]); // Runs too often
```

#### 3. Cleanup Functions
```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("Done!");
  }, 1000);

  // Cleanup: Clear timer if component unmounts
  return () => clearTimeout(timer);
}, []);
```

## 🔧 Advanced Hook Patterns

### 1. useCallback - Memoize Functions

**Problem**: Functions are recreated on every render, causing child re-renders.

```javascript
const handleClick = useCallback(() => {
  dispatch(addToCart(product));
}, [product]); // Only recreate when product changes
```

### 2. useMemo - Memoize Values

**Problem**: Expensive calculations run on every render.

```javascript
const total = useMemo(() => {
  return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
}, [cartItems]); // Only recalculate when cartItems change
```

### 3. Custom Hooks

**Why**: Extract reusable logic, test separately, cleaner components.

```javascript
// useLocalStorage hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}
```

## 🐛 Common Hook Mistakes

### 1. Stale Closures
```javascript
// ❌ Problem: Uses old state value
useEffect(() => {
  setInterval(() => {
    console.log(count); // Always logs initial count
  }, 1000);
}, []);

// ✅ Solution: Include dependency or use functional update
useEffect(() => {
  setInterval(() => {
    console.log(count);
  }, 1000);
}, [count]);
```

### 2. Infinite Loops
```javascript
// ❌ Problem: Updates state in effect without dependencies
useEffect(() => {
  setCount(count + 1); // Infinite loop!
});

// ✅ Solution: Include dependencies or use functional update
useEffect(() => {
  setCount(prevCount => prevCount + 1);
}, []); // Empty deps = run once
```

### 3. Missing Dependencies
```javascript
// ❌ Problem: ESLint warning, potential bugs
const [count, setCount] = useState(0);
useEffect(() => {
  console.log(count);
}, []); // Missing 'count' in deps

// ✅ Solution: Add dependency or remove console.log
useEffect(() => {
  console.log(count);
}, [count]);
```

## 🧪 Testing Hooks

### Testing useState
```javascript
import { renderHook, act } from "@testing-library/react";

test("should update count", () => {
  const { result } = renderHook(() => useState(0));

  expect(result.current[0]).toBe(0);

  act(() => {
    result.current[1](1);
  });

  expect(result.current[0]).toBe(1);
});
```

### Testing useEffect
```javascript
test("should fetch products on mount", async () => {
  const mockProducts = [{ id: 1, name: "Test" }];

  // Mock axios
  jest.spyOn(axios, "get").mockResolvedValue({ data: mockProducts });

  const { result, waitForNextUpdate } = renderHook(() => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      axios.get("/api/products").then(response => {
        setProducts(response.data);
        setLoading(false);
      });
    }, []);

    return { products, loading };
  });

  await waitForNextUpdate();

  expect(result.current.products).toEqual(mockProducts);
  expect(result.current.loading).toBe(false);
});
```

## 📚 Hook Dependencies in Our App

| Component | Hooks Used | Purpose |
|-----------|------------|---------|
| ProductList | useState, useEffect | Manage products, loading, errors |
| ProductCard | useDispatch | Add items to cart |
| Cart | useSelector, useDispatch | Read cart state, dispatch actions |
| AddProductForm | useState | Form input management |
| App | None | Root component |

## 🚀 Migration from Classes

### Class Component Example
```javascript
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], loading: true };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    // API call
  }

  render() {
    return <div>{/* JSX */}</div>;
  }
}
```

### Functional Component with Hooks
```javascript
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // API call
  };

  return <div>{/* JSX */}</div>;
}
```

## 🎯 Key Takeaways

1. **useState** manages local component state
2. **useEffect** handles side effects and lifecycle
3. **useSelector** reads from Redux store
4. **useDispatch** sends actions to Redux
5. **Dependency arrays** control when effects run
6. **Custom hooks** enable logic reuse
7. **Rules matter** - follow them strictly
8. **Testing hooks** requires special utilities

## 📖 Additional Resources

- [React Hooks Documentation](https://react.dev/reference/react/hooks)
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)
- [Testing Library](https://testing-library.com/docs/react-testing-library/api/#renderhook)
- [Custom Hooks Guide](https://usehooks.com/)
