# Nestly - Real Estate Platform Architecture

## Project Overview
Nestly is a modern real estate rental platform built with Next.js 16, featuring property listings, user authentication, booking system, and messaging capabilities.

## Technology Stack

### Frontend
- **Framework**: Next.js 16.2.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (CSS-native configuration)
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Urbanist (Google Fonts)
- **Animations**: GSAP (for navigation)

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB (local)
- **ODM**: Mongoose
- **Authentication**: JWT (httpOnly cookies)
- **API**: Next.js API Routes

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript

## Project Structure

```
nestly/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group (no nav/footer)
│   │   ├── layout.tsx
│   │   ├── signin/
│   │   └── signup/
│   ├── (main)/                   # Main route group (with nav/footer)
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Homepage
│   │   ├── listings/
│   │   ├── messages/
│   │   ├── profile/
│   │   └── how-it-works/
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── bookings/
│   │   ├── listings/
│   │   ├── messages/
│   │   └── seed/
│   ├── globals.css               # Global styles + Tailwind config
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── auth/                     # Auth-specific components
│   ├── home/                     # Homepage components
│   ├── ui/                       # Reusable UI primitives
│   ├── nav.tsx
│   ├── main-footer.tsx
│   └── property-card.tsx
├── contexts/                     # React contexts
│   └── auth-context.tsx
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Auth helpers
│   ├── jwt.ts                    # JWT utilities
│   ├── mongodb.ts                # Database connection
│   ├── schemas.ts                # Validation schemas
│   └── utils.ts                  # General utilities
├── models/                       # Mongoose models
│   ├── User.ts
│   ├── Property.ts
│   └── Booking.ts
├── types/                        # TypeScript types
└── public/                       # Static assets
```

## Design System

### Color System
- **Format**: HSL (for opacity support)
- **Primary**: Red/Pink (350° 72% 41%) - Airbnb-inspired
- **Secondary**: Warm Beige (40° 50% 93%)
- **Background**: Off-white (36° 100% 97%)
- **Dark Mode**: Supported via CSS variables

### Typography
- **Font Family**: Urbanist
- **Headings**: font-heading class
- **Body**: font-sans class
- **Hierarchy**: h1-h6 with consistent scaling

### Component Architecture
- **Base Layer**: Radix UI primitives
- **Styling**: Tailwind CSS utilities
- **Variants**: CVA (Class Variance Authority)
- **Composition**: Single responsibility components

## Authentication System

### Flow
1. User submits credentials
2. Server validates against MongoDB
3. JWT access token (15min) + refresh token (7d) generated
4. Tokens stored in httpOnly cookies
5. Refresh token hashed (SHA-256) in database
6. Client-side auth state managed via React Context

### Security Features
- httpOnly cookies (XSS protection)
- Secure flag in production
- SameSite: Lax
- Token hashing in database
- Password hashing with bcrypt
- No plaintext secrets

### Protected Routes
- Profile page
- Booking creation
- Messages (future)

## Database Schema

### User Model
```typescript
{
  name: string (required)
  email: string (required, unique, indexed)
  password: string (required, hashed)
  avatar?: string
  refreshToken?: string (hashed)
  createdAt: Date
  updatedAt: Date
}
```

### Property Model
```typescript
{
  title: string (required)
  description: string
  location: string (required, indexed)
  price: number (required, min: 0)
  type: enum (villa, apartment, house, cabin)
  bedrooms: number (min: 1)
  bathrooms: number (min: 1)
  guests: number (min: 1)
  amenities: string[]
  images: string[]
  image: string (required)
  rating: number (min: 0, max: 5)
  reviews: number (min: 0)
  available: boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

### Booking Model
```typescript
{
  propertyId: ObjectId (ref: Property)
  userId: ObjectId (ref: User)
  checkIn: Date (required)
  checkOut: Date (required)
  guests: number (required, min: 1)
  nights: number (required, min: 1)
  pricePerNight: number (required, min: 0)
  totalPrice: number (required, min: 0)
  serviceFee: number (required, min: 0)
  grandTotal: number (required, min: 0)
  status: enum (pending, confirmed, cancelled)
  paymentStatus: enum (pending, completed, failed)
  paymentMethod: string (default: mock_payment)
  bookingReference: string (required, unique)
  createdAt: Date
  updatedAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token

### Listings
- `GET /api/listings` - Get all properties (with pagination)
- `GET /api/listings/[id]` - Get single property

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings` - Get user bookings (protected)

### Messages
- `GET /api/messages` - Get messages (mock data)

### Utilities
- `POST /api/seed` - Seed database (protected with SEED_SECRET_KEY)

## Key Features

### 1. Property Browsing
- Grid layout with responsive cards
- Category filtering (All, Beachfront, Cabins, City, etc.)
- Search by location/title
- Price range filtering
- Property type filtering

### 2. Property Details
- Image gallery
- Amenities list
- Pricing breakdown
- Booking form
- Dynamic price calculation

### 3. Booking System
- Date selection (check-in/check-out)
- Guest count selection
- Real-time price calculation
- Service fee (10%)
- Unique booking reference generation
- Mock payment (auto-complete)
- Booking history in profile

### 4. User Profile
- User information display
- Booking history with property details
- Logout functionality
- Quick action cards

### 5. Navigation
- Animated pill navigation
- Conditional items based on auth state
- Fixed positioning with blur background
- Smooth transitions

## Performance Optimizations

### Image Handling
- Next.js Image component
- Lazy loading
- Error fallbacks with generic icons
- Responsive sizes

### Code Splitting
- Route-based splitting (App Router)
- Dynamic imports where needed
- Component-level splitting

### Caching
- MongoDB connection pooling
- Static page generation where possible

## Security Measures

1. **Authentication**
   - JWT with short expiration
   - Refresh token rotation
   - httpOnly cookies
   - Token hashing

2. **Input Validation**
   - Zod schemas
   - Server-side validation
   - Type safety with TypeScript

3. **Error Handling**
   - Generic error messages (no info leakage)
   - Try-catch blocks
   - Proper HTTP status codes

4. **Environment Variables**
   - Secrets in .env.local
   - No hardcoded credentials
   - Example file provided

## Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile-First Approach
- Stacked layouts on mobile
- Hamburger menu (future)
- Touch-friendly buttons
- Optimized images

## Future Enhancements

1. **Messaging System**
   - Real-time chat
   - WebSocket integration
   - Message persistence

2. **Payment Integration**
   - Stripe/PayPal
   - Real payment processing
   - Invoice generation

3. **Advanced Booking**
   - Date conflict checking
   - Booking modification
   - Cancellation policy
   - Email notifications

4. **Host Features**
   - Property management
   - Booking approval
   - Calendar management
   - Analytics dashboard

5. **Search Enhancement**
   - Map integration
   - Advanced filters
   - Saved searches
   - Price alerts

## Development Workflow

### Setup
```bash
pnpm install
cp .env.local.example .env.local
# Configure MongoDB connection
pnpm run dev
```

### Build
```bash
pnpm run build
pnpm start
```

### Seed Database
```bash
# Visit /api/seed with SEED_SECRET_KEY in .env.local
```

## Deployment Considerations

1. **Environment Variables**
   - JWT_SECRET
   - REFRESH_TOKEN_SECRET
   - MONGODB_URI
   - SEED_SECRET_KEY
   - NODE_ENV=production

2. **Database**
   - MongoDB Atlas for production
   - Connection pooling
   - Indexes for performance

3. **CDN**
   - Static assets on CDN
   - Image optimization
   - Edge caching

4. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - Analytics

## Best Practices Followed

1. **Code Organization**
   - Route groups for layouts
   - Component modularity
   - Clear separation of concerns

2. **Type Safety**
   - TypeScript throughout
   - Strict mode enabled
   - Interface definitions

3. **Styling**
   - CSS variables for theming
   - No hardcoded colors
   - Consistent spacing

4. **Accessibility**
   - Semantic HTML
   - ARIA labels
   - Keyboard navigation
   - Color contrast

5. **Performance**
   - Code splitting
   - Image optimization
   - Lazy loading
   - Minimal bundle size

## Conclusion

Nestly is built with modern web development best practices, focusing on performance, security, and user experience. The architecture is scalable and maintainable, ready for future enhancements and production deployment.
