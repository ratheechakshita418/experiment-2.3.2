# Architecture Overview

## 🏛️ System Architecture

This shopping cart application follows a modern full-stack architecture with clear separation of concerns.

```
┌─────────────────┐    HTTP Requests    ┌─────────────────┐
│   React Frontend│◄──────────────────►│ Express Backend │
│   (Port 3000)   │                     │   (Port 5000)   │
└─────────────────┘                     └─────────────────┘
         │                                       │
         │                                       │
         ▼                                       ▼
┌─────────────────┐                     ┌─────────────────┐
│  Redux Store    │                     │    MongoDB      │
│  (State Mgmt)   │                     │   Database      │
└─────────────────┘                     └─────────────────┘
```

## 🧩 Component Architecture

### Frontend Components

```
App (Root Component)
├── ProductList
│   └── ProductCard (multiple)
├── Cart
│   └── CartItem (multiple)
└── AddProductForm
```

### Backend Architecture

```
Server
├── Routes (/api/products)
├── Controllers (business logic)
├── Models (data schemas)
├── Middleware (CORS, errors)
└── Config (database)
```

## 🔄 Data Flow Architecture

### Complete Request-Response Cycle

```
1. User Interaction
        ↓
2. React Component (onClick, onSubmit)
        ↓
3. Redux Action Dispatch
        ↓
4. Axios HTTP Request
        ↓
5. Development Proxy (client → server)
        ↓
6. Express Route Handler
        ↓
7. Controller Function
        ↓
8. Mongoose Model Operation
        ↓
9. MongoDB Query/Write
        ↓
10. Database Response
        ↓
11. Controller Response
        ↓
12. Express JSON Response
        ↓
13. Axios Response Handling
        ↓
14. Redux State Update
        ↓
15. React Re-render
        ↓
16. UI Update
```

### Detailed Flow Example: Adding to Cart

```
User clicks "Add to Cart" button
    ↓
ProductCard component calls dispatch(addToCart(product))
    ↓
Redux cartSlice reducer updates state
    ↓
localStorage saves cart data
    ↓
Cart component re-renders with new item
    ↓
UI shows updated cart
```

### API Request Flow

```
Frontend: axios.get("/api/products")
    ↓
Proxy: /api/* → http://localhost:5000/api/*
    ↓
Express: app.use("/api/products", productRoutes)
    ↓
Route: router.get("/", findAllProducts)
    ↓
Controller: ProductModel.find({})
    ↓
Mongoose: MongoDB query execution
    ↓
Database: Returns product documents
    ↓
Controller: Returns JSON array
    ↓
Express: Sends HTTP 200 response
    ↓
Proxy: Forwards response to frontend
    ↓
Axios: Resolves promise with data
    ↓
React: setProducts(data) updates state
    ↓
UI: Re-renders with product list
```

## 🗂️ File Organization

### Frontend Structure

```
client/src/
├── app/
│   └── store.js              # Redux store configuration
├── features/
│   └── cart/
│       └── cartSlice.js      # Cart state logic
├── components/
│   ├── ProductCard.jsx       # Individual product display
│   ├── ProductList.jsx       # Product catalog
│   ├── Cart.jsx              # Shopping cart
│   └── AddProductForm.jsx    # Product creation form
├── App.jsx                   # Root component
├── index.js                  # App entry point
└── setupProxy.js             # Development proxy
```

### Backend Structure

```
server/
├── config/
│   └── db.js                 # Database connection
├── models/
│   └── Product.js            # Product schema
├── routes/
│   └── product.routes.js     # API routes
├── controllers/
│   └── product.controller.js # Business logic
├── middlewares/
│   └── errorMiddleware.js    # Error handling
├── .env                      # Environment variables
├── package.json              # Dependencies
└── server.js                 # Main server file
```

## 🛠️ Technology Stack Rationale

### Frontend Choices

- **React 18**: Latest React with concurrent features and hooks
- **Redux Toolkit**: Simplifies Redux setup and reduces boilerplate
- **Material-UI**: Consistent, accessible component library
- **Axios**: Better error handling than fetch, supports interceptors

### Backend Choices

- **Node.js + Express**: JavaScript full-stack, vast ecosystem
- **MongoDB + Mongoose**: Flexible document storage, easy scaling
- **ES Modules**: Modern JavaScript module system

## 🔒 Security Considerations

### CORS (Cross-Origin Resource Sharing)
```
Frontend (localhost:3000) ← CORS → Backend (localhost:5000)
```
- **Why needed**: Browsers block cross-origin requests by default
- **How implemented**: `cors` middleware in Express
- **Development**: Proxy handles CORS automatically

### Input Validation
- **Frontend**: Form validation before submission
- **Backend**: Schema validation in Mongoose models
- **Database**: Type checking and required field validation

## 📊 State Management Architecture

### Redux Store Structure

```
{
  cart: {
    cartItems: [
      {
        _id: "64f1a2b3...",
        name: "Product Name",
        price: 29.99,
        image: "url",
        description: "Description",
        qty: 2
      }
    ]
  }
}
```

### State Persistence

```
Component State → Redux Store → localStorage
                    ↓
            Rehydration on App Load
```

## 🚀 Deployment Architecture

### Development
```
Frontend (Port 3000) ←→ Proxy ←→ Backend (Port 5000) ←→ MongoDB (Port 27017)
```

### Production
```
Web Server (Nginx/Apache) → Frontend Build (Static Files)
                              ↓
                         Backend API Server ←→ MongoDB
```

## 🔄 API Design Patterns

### RESTful Endpoints
- `GET /api/products` - Read all products
- `POST /api/products` - Create product
- Consistent URL structure
- JSON request/response format

### Error Handling
```
Client Request → Server Validation → Database Operation
                      ↓
                Success: 200/201 + Data
                      ↓
                Error: 400/500 + Error Message
```

## 📈 Scalability Considerations

### Frontend
- Component-based architecture allows easy feature addition
- Redux enables complex state management
- Material-UI provides consistent scaling

### Backend
- Express middleware pattern supports extension
- Mongoose models provide data abstraction
- Error middleware centralizes error handling

### Database
- MongoDB scales horizontally
- Mongoose provides query optimization
- Indexes can be added for performance
