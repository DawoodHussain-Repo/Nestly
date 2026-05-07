# Nestly API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a valid JWT token stored in httpOnly cookies. The token is automatically sent with requests from the browser.

### Token Lifecycle
- **Access Token**: 15 minutes expiration
- **Refresh Token**: 7 days expiration
- **Storage**: httpOnly cookies (secure in production)

---

## Authentication Endpoints

### Sign Up
Create a new user account.

**Endpoint**: `POST /api/auth/signup`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Validation Rules**:
- `name`: Required, string, min 2 characters
- `email`: Required, valid email format, unique
- `password`: Required, min 8 characters

**Success Response** (201):
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses**:
- `400`: Validation error or email already exists
- `500`: Internal server error

**Cookies Set**:
- `accessToken`: JWT access token (15min)
- `refreshToken`: JWT refresh token (7d)

---

### Sign In
Authenticate existing user.

**Endpoint**: `POST /api/auth/signin`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "/placeholder-user.jpg"
  }
}
```

**Error Responses**:
- `400`: Missing credentials
- `401`: Invalid credentials
- `500`: Internal server error

**Cookies Set**:
- `accessToken`: JWT access token (15min)
- `refreshToken`: JWT refresh token (7d)

---

### Get Current User
Retrieve authenticated user information.

**Endpoint**: `GET /api/auth/me`

**Authentication**: Required

**Success Response** (200):
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "/placeholder-user.jpg"
  }
}
```

**Error Responses**:
- `401`: Unauthorized (no token or invalid token)
- `500`: Internal server error

---

### Refresh Token
Get a new access token using refresh token.

**Endpoint**: `POST /api/auth/refresh`

**Authentication**: Requires valid refresh token in cookies

**Success Response** (200):
```json
{
  "success": true
}
```

**Error Responses**:
- `401`: Invalid or expired refresh token
- `500`: Internal server error

**Cookies Set**:
- `accessToken`: New JWT access token (15min)

---

### Logout
Invalidate user session.

**Endpoint**: `POST /api/auth/logout`

**Authentication**: Required

**Success Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Cookies Cleared**:
- `accessToken`
- `refreshToken`

---

## Property Endpoints

### Get All Properties
Retrieve list of all properties with pagination.

**Endpoint**: `GET /api/listings`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Example Request**:
```
GET /api/listings?page=1&limit=10
```

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Luxury Villa in Bali",
      "description": "Beautiful villa with ocean view",
      "location": "Bali, Indonesia",
      "price": 150,
      "type": "villa",
      "bedrooms": 3,
      "bathrooms": 2,
      "guests": 6,
      "amenities": ["WiFi", "Pool", "Kitchen"],
      "images": ["/placeholder.jpg"],
      "image": "/placeholder.jpg",
      "rating": 4.8,
      "reviews": 124,
      "available": true,
      "createdAt": "2026-05-01T00:00:00.000Z",
      "updatedAt": "2026-05-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

**Error Responses**:
- `500`: Internal server error

---

### Get Single Property
Retrieve detailed information about a specific property.

**Endpoint**: `GET /api/listings/[id]`

**Path Parameters**:
- `id`: MongoDB ObjectId of the property

**Example Request**:
```
GET /api/listings/507f1f77bcf86cd799439011
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Luxury Villa in Bali",
    "description": "Beautiful villa with ocean view...",
    "location": "Bali, Indonesia",
    "price": 150,
    "type": "villa",
    "bedrooms": 3,
    "bathrooms": 2,
    "guests": 6,
    "amenities": ["WiFi", "Pool", "Kitchen", "Air Conditioning"],
    "images": [
      "/placeholder.jpg",
      "/placeholder2.jpg",
      "/placeholder3.jpg"
    ],
    "image": "/placeholder.jpg",
    "rating": 4.8,
    "reviews": 124,
    "available": true,
    "createdAt": "2026-05-01T00:00:00.000Z",
    "updatedAt": "2026-05-01T00:00:00.000Z"
  }
}
```

**Error Responses**:
- `400`: Invalid property ID format
- `404`: Property not found
- `500`: Internal server error

---

## Booking Endpoints

### Create Booking
Create a new property booking.

**Endpoint**: `POST /api/bookings`

**Authentication**: Required

**Request Body**:
```json
{
  "propertyId": "507f1f77bcf86cd799439011",
  "checkIn": "2026-06-01",
  "checkOut": "2026-06-05",
  "guests": 2
}
```

**Validation Rules**:
- `propertyId`: Required, valid MongoDB ObjectId
- `checkIn`: Required, date, not in the past
- `checkOut`: Required, date, after checkIn
- `guests`: Required, number, min 1, max property.guests

**Success Response** (201):
```json
{
  "success": true,
  "booking": {
    "id": "507f1f77bcf86cd799439012",
    "bookingReference": "BK-1K2M3N4P-5Q6R7S",
    "propertyId": "507f1f77bcf86cd799439011",
    "checkIn": "2026-06-01T00:00:00.000Z",
    "checkOut": "2026-06-05T00:00:00.000Z",
    "guests": 2,
    "nights": 4,
    "pricePerNight": 150,
    "totalPrice": 600,
    "serviceFee": 60,
    "grandTotal": 660,
    "status": "confirmed",
    "paymentStatus": "completed"
  }
}
```

**Pricing Calculation**:
- `nights` = days between checkOut and checkIn
- `totalPrice` = pricePerNight × nights
- `serviceFee` = totalPrice × 0.10 (10%)
- `grandTotal` = totalPrice + serviceFee

**Error Responses**:
- `400`: Validation error (missing fields, invalid dates, guest count exceeds limit)
- `401`: Unauthorized (not authenticated)
- `404`: Property not found
- `500`: Internal server error

---

### Get User Bookings
Retrieve all bookings for authenticated user.

**Endpoint**: `GET /api/bookings`

**Authentication**: Required

**Success Response** (200):
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "bookingReference": "BK-1K2M3N4P-5Q6R7S",
      "propertyId": {
        "title": "Luxury Villa in Bali",
        "location": "Bali, Indonesia",
        "image": "/placeholder.jpg",
        "price": 150
      },
      "checkIn": "2026-06-01T00:00:00.000Z",
      "checkOut": "2026-06-05T00:00:00.000Z",
      "guests": 2,
      "nights": 4,
      "pricePerNight": 150,
      "totalPrice": 600,
      "serviceFee": 60,
      "grandTotal": 660,
      "status": "confirmed",
      "paymentStatus": "completed",
      "paymentMethod": "mock_payment",
      "createdAt": "2026-05-08T00:00:00.000Z",
      "updatedAt": "2026-05-08T00:00:00.000Z"
    }
  ]
}
```

**Sorting**: Results sorted by creation date (newest first)

**Error Responses**:
- `401`: Unauthorized (not authenticated)
- `500`: Internal server error

---

## Messages Endpoint

### Get Messages
Retrieve user messages (currently returns mock data).

**Endpoint**: `GET /api/messages`

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Sarah Johnson",
      "avatar": "/placeholder-user.jpg",
      "lastMessage": "Thanks for the quick response!",
      "timestamp": "2 hours ago",
      "unread": true
    }
  ]
}
```

**Note**: This endpoint currently returns mock data. Real implementation pending.

---

## Seed Endpoint

### Seed Database
Populate database with sample data.

**Endpoint**: `POST /api/seed`

**Authentication**: Requires `SEED_SECRET_KEY` in environment variables

**Request Headers**:
```
x-seed-secret: <SEED_SECRET_KEY>
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Database seeded successfully",
  "data": {
    "users": 5,
    "properties": 20
  }
}
```

**Error Responses**:
- `401`: Unauthorized (missing or invalid secret key)
- `500`: Internal server error

**Warning**: This endpoint clears existing data before seeding.

---

## Error Response Format

All error responses follow this format:

```json
{
  "error": "Error message description",
  "success": false
}
```

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `500`: Internal Server Error

---

## Rate Limiting

Currently no rate limiting implemented. Recommended for production:
- Authentication endpoints: 5 requests per minute
- Booking creation: 10 requests per minute
- General endpoints: 100 requests per minute

---

## CORS

CORS is configured to allow requests from the same origin. For production, configure allowed origins in environment variables.

---

## Webhooks

Not currently implemented. Future consideration for:
- Payment confirmations
- Booking status updates
- Email notifications

---

## Versioning

Current version: v1 (implicit)

Future versions will use URL versioning:
- `/api/v1/...`
- `/api/v2/...`

---

## Testing

### Example cURL Requests

**Sign Up**:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"SecurePass123!"}'
```

**Sign In**:
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123!"}' \
  -c cookies.txt
```

**Get Properties**:
```bash
curl http://localhost:3000/api/listings
```

**Create Booking**:
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"propertyId":"507f1f77bcf86cd799439011","checkIn":"2026-06-01","checkOut":"2026-06-05","guests":2}'
```

---

## Support

For issues or questions:
- Check error messages in response
- Verify authentication tokens
- Ensure request body matches schema
- Check MongoDB connection
- Review server logs

---

## Changelog

### v1.0.0 (Current)
- Initial API release
- Authentication endpoints
- Property listing endpoints
- Booking system
- Mock messaging endpoint
- Database seeding
