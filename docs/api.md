# API Documentation

## 🌐 API Overview

This document describes the REST API endpoints for the shopping cart backend. The API provides product management functionality using Express.js and MongoDB.

## 🔗 Base URL

**Development**: `http://localhost:5000/api`

**Production**: `https://your-domain.com/api`

## 📋 Endpoints

### Products

#### 1. Get All Products
**GET** `/api/products`

Retrieves a list of all products from the database.

**Response:**
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Wireless Headphones",
    "price": 99.99,
    "image": "https://example.com/headphones.jpg",
    "description": "High-quality wireless headphones",
    "createdAt": "2023-09-01T10:00:00.000Z",
    "updatedAt": "2023-09-01T10:00:00.000Z"
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

#### 2. Create Product
**POST** `/api/products`

Creates a new product in the database.

**Request Body:**
```json
{
  "name": "Bluetooth Speaker",
  "price": 49.99,
  "image": "https://example.com/speaker.jpg",
  "description": "Portable wireless speaker with great sound"
}
```

**Response:**
```json
{
  "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
  "name": "Bluetooth Speaker",
  "price": 49.99,
  "image": "https://example.com/speaker.jpg",
  "description": "Portable wireless speaker with great sound",
  "createdAt": "2023-09-01T10:05:00.000Z",
  "updatedAt": "2023-09-01T10:05:00.000Z"
}
```

**Status Codes:**
- `201` - Created successfully
- `400` - Bad request (validation error)
- `500` - Server error

## 📝 Data Models

### Product Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | MongoDB unique identifier |
| `name` | String | Yes | Product name |
| `price` | Number | Yes | Product price (USD) |
| `image` | String | Yes | Product image URL |
| `description` | String | Yes | Product description |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

## 🔒 Validation Rules

### Product Creation Validation

- **name**: Required, non-empty string
- **price**: Required, positive number
- **image**: Required, valid URL string
- **description**: Required, non-empty string

**Validation Error Response:**
```json
{
  "message": "All fields are required"
}
```

## 🚀 API Testing

### Using cURL

**Get all products:**
```bash
curl -X GET http://localhost:5000/api/products
```

**Create a product:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": 29.99,
    "image": "https://example.com/image.jpg",
    "description": "A test product"
  }'
```

### Using Postman

1. **Method**: POST
2. **URL**: `http://localhost:5000/api/products`
3. **Headers**:
   - `Content-Type: application/json`
4. **Body** (raw JSON):
   ```json
   {
     "name": "Gaming Mouse",
     "price": 39.99,
     "image": "https://example.com/mouse.jpg",
     "description": "Ergonomic gaming mouse with RGB lighting"
   }
   ```

## ⚠️ Error Handling

### Common Error Responses

**400 Bad Request** (Validation Error):
```json
{
  "message": "All fields are required"
}
```

**404 Not Found** (Invalid Route):
```json
{
  "message": "Not Found - /api/invalid-route"
}
```

**500 Internal Server Error** (Server Error):
```json
{
  "message": "Database connection failed",
  "stack": "Error stack trace (development only)"
}
```

## 🔄 Request Flow

### Complete API Request Lifecycle

```
Client Request → Express Server → Route Handler → Controller → Model → Database
                        ↓
Database Response → Model → Controller → Express Response → Client
```

### Detailed Flow for POST /api/products

1. **Client** sends POST request with JSON body
2. **Express** receives request, applies middleware (CORS, JSON parsing)
3. **Route** (`/api/products`) matches and calls controller
4. **Controller** validates input data
5. **Model** creates new Product document
6. **Database** saves document and returns result
7. **Controller** sends success response with created product
8. **Express** sends HTTP 201 response to client

## 🛡️ Security Features

### CORS (Cross-Origin Resource Sharing)
- Allows requests from frontend domain
- Configured in server.js with `cors` middleware

### Input Sanitization
- Express.json() parses and sanitizes JSON input
- Mongoose schema validation prevents invalid data

### Error Information
- Stack traces hidden in production
- Generic error messages for security

## 📊 Rate Limiting

Currently not implemented, but recommended for production:
- Limit requests per IP address
- Prevent API abuse
- Use `express-rate-limit` middleware

## 🔧 Development vs Production

### Development Mode
- Detailed error stack traces
- CORS enabled for localhost
- Console logging for debugging

### Production Mode
- Minimal error information
- CORS configured for specific domains
- Optimized performance settings

## 🧪 Testing Strategy

### Unit Tests
```javascript
// Example controller test
describe("createProduct", () => {
  it("should create a product successfully", async () => {
    const mockProduct = {
      name: "Test Product",
      price: 29.99,
      image: "test.jpg",
      description: "Test description"
    };

    const response = await request(app)
      .post("/api/products")
      .send(mockProduct)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe(mockProduct.name);
  });
});
```

### Integration Tests
- Test complete request-response cycles
- Verify database operations
- Test error scenarios

## 🚀 API Evolution

### Versioning Strategy
- Current: No versioning (v1 implied)
- Future: `/api/v1/products`, `/api/v2/products`

### Backward Compatibility
- Avoid breaking changes to existing endpoints
- Deprecate old endpoints gradually
- Provide migration guides

## 📈 Performance Considerations

### Database Optimization
- Add indexes for frequently queried fields
- Use MongoDB aggregation pipelines for complex queries
- Implement pagination for large result sets

### Caching Strategy
- Redis for session storage
- CDN for static assets
- API response caching

### Monitoring
- Request/response logging
- Error tracking
- Performance metrics

## 🔗 Related Documentation

- [Architecture Overview](./ARCHITECTURE.md)
- [Redux State Management](./REDUX.md)
- [React Hooks Guide](./HOOKS.md)
- [Application Flow](./FLOW.md)
