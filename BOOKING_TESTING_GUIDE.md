# Booking System Testing Guide

## Prerequisites
1. MongoDB running locally
2. Development server running (`pnpm run dev`)
3. User account created (sign up if needed)
4. Seed data loaded (visit `/api/seed` if needed)

## Test Scenario 1: Complete Booking Flow

### Step 1: Browse Listings
1. Navigate to homepage (`/`)
2. Click "Listings" in navigation or scroll to property grid
3. Click on any property card

### Step 2: View Property Details
1. Verify property details page loads
2. Check that all property information displays:
   - Title and location
   - Price per night
   - Bedrooms, bathrooms, guests
   - Description
   - Amenities
   - Image gallery

### Step 3: Create a Booking
1. **Select Check-in Date**:
   - Click the check-in date input
   - Choose a date (today or future)
   
2. **Select Check-out Date**:
   - Click the check-out date input
   - Choose a date after check-in
   
3. **Select Guests**:
   - Use the dropdown to select number of guests
   - Verify it doesn't exceed property's max guests

4. **Review Pricing**:
   - Verify nights calculation is correct
   - Check price breakdown:
     - `$X × Y nights = $Z`
     - `Service fee (10%) = $W`
     - `Total = $T`

5. **Submit Booking**:
   - Click "Reserve Now" button
   - Wait for processing (button shows "Processing...")

### Step 4: Verify Success
1. **Toast Notifications**:
   - First toast: "Booking confirmed! Reference: BK-XXXXX-XXXXX"
   - Second toast: "Payment completed! Total: $XXX"

2. **Automatic Redirect**:
   - After 3 seconds, redirected to profile page

### Step 5: View Booking in Profile
1. Scroll to "My Bookings" section
2. Verify booking card displays:
   - Property image
   - Property title and location
   - Booking reference (BK-XXXXX-XXXXX)
   - Status badge (green "Confirmed")
   - Payment status (green "Payment completed")
   - Grand total amount
   - Check-in date (formatted)
   - Check-out date (formatted)
   - Number of guests
   - Pricing breakdown (nights, price/night, service fee)

## Test Scenario 2: Validation Tests

### Test 2.1: Unauthenticated User
1. Sign out if signed in
2. Navigate to any property detail page
3. Fill in booking form
4. Click "Reserve Now"
5. **Expected**: Toast error "Please sign in to make a reservation"
6. **Expected**: Redirected to `/signin`

### Test 2.2: Missing Dates
1. Sign in
2. Navigate to property detail page
3. Leave check-in or check-out empty
4. Click "Reserve Now"
5. **Expected**: Button is disabled (can't click)

### Test 2.3: Invalid Date Range
1. Select check-in date
2. Select check-out date BEFORE check-in
3. **Expected**: Check-out date picker prevents this (min date = check-in)

### Test 2.4: Past Check-in Date
1. Try to select a past date for check-in
2. **Expected**: Date picker prevents this (min date = today)

## Test Scenario 3: Multiple Bookings

### Step 1: Create First Booking
1. Follow "Complete Booking Flow" above
2. Note the booking reference

### Step 2: Create Second Booking
1. Navigate to a different property
2. Create another booking with different dates
3. Note the second booking reference

### Step 3: View All Bookings
1. Go to profile page
2. Verify both bookings appear
3. Verify they are sorted by newest first
4. Verify each has unique booking reference
5. Verify each shows correct property details

## Test Scenario 4: Empty State

### Step 1: New User
1. Create a new user account
2. Navigate to profile page
3. Scroll to "My Bookings" section

### Step 2: Verify Empty State
1. **Expected**: Empty state card displays
2. **Expected**: Icon (receipt) shown
3. **Expected**: Message: "No bookings yet"
4. **Expected**: Subtext: "Start exploring and book your perfect stay"
5. **Expected**: "Browse Listings" button

### Step 3: Click Browse Listings
1. Click the "Browse Listings" button
2. **Expected**: Redirected to `/listings`

## Test Scenario 5: Responsive Design

### Mobile View (< 768px)
1. Resize browser to mobile width or use device emulator
2. Navigate to property detail page
3. **Verify**:
   - Booking form stacks vertically
   - Date inputs are touch-friendly
   - Button is full width
   - Pricing breakdown is readable

4. Navigate to profile page
5. **Verify**:
   - Booking cards stack vertically
   - Property image is full width
   - All text is readable
   - Status badges are visible

### Tablet View (768px - 1024px)
1. Resize browser to tablet width
2. **Verify**:
   - Booking form layout is appropriate
   - Booking cards use responsive grid
   - Images scale properly

### Desktop View (> 1024px)
1. Full screen browser
2. **Verify**:
   - Booking form is in sidebar
   - Booking cards in grid layout
   - All spacing is comfortable

## Test Scenario 6: API Testing

### Test 6.1: Create Booking API
```bash
# Sign in first to get auth cookie
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt

# Create booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "propertyId": "PROPERTY_ID_HERE",
    "checkIn": "2026-06-01",
    "checkOut": "2026-06-05",
    "guests": 2
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "booking": {
    "id": "...",
    "bookingReference": "BK-...",
    "propertyId": "...",
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

### Test 6.2: Fetch Bookings API
```bash
curl -X GET http://localhost:3000/api/bookings \
  -b cookies.txt
```

**Expected Response**:
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "...",
      "bookingReference": "BK-...",
      "propertyId": {
        "title": "Luxury Villa",
        "location": "Bali, Indonesia",
        "image": "/placeholder.jpg",
        "price": 150
      },
      "checkIn": "2026-06-01T00:00:00.000Z",
      "checkOut": "2026-06-05T00:00:00.000Z",
      "guests": 2,
      "nights": 4,
      "grandTotal": 660,
      "status": "confirmed",
      "paymentStatus": "completed"
    }
  ]
}
```

## Test Scenario 7: Error Handling

### Test 7.1: Invalid Property ID
1. Manually navigate to `/listings/invalid-id`
2. Try to create booking
3. **Expected**: Error toast "Property not found"

### Test 7.2: Exceeding Guest Limit
1. Navigate to property with max 2 guests
2. Try to book for 3+ guests
3. **Expected**: Dropdown only shows up to max guests

### Test 7.3: Network Error
1. Stop MongoDB or backend
2. Try to create booking
3. **Expected**: Error toast "An unexpected error occurred"

## Success Criteria

✅ All test scenarios pass
✅ No console errors
✅ No TypeScript errors
✅ Responsive on all screen sizes
✅ Toast notifications display correctly
✅ Data persists in MongoDB
✅ Booking references are unique
✅ Price calculations are accurate
✅ Authentication protection works
✅ Loading states display properly
✅ Empty states display properly
✅ Error messages are user-friendly

## Known Limitations (By Design)

1. **Mock Payment**: All payments automatically succeed
2. **No Date Conflicts**: System doesn't check if property is already booked
3. **No Cancellation**: Users can't cancel bookings yet
4. **No Modification**: Users can't modify bookings yet
5. **No Email**: No email confirmations sent

These are intentional limitations for the MVP and can be added in future iterations.
