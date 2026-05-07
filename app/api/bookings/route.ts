import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Property from '@/models/Property';
import { getAuthUser } from '@/lib/auth';

// Generate unique booking reference
function generateBookingReference(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `BK-${timestamp}-${random}`.toUpperCase();
}

// Calculate nights between two dates
function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Create a new booking
export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    
    if (!authUser) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { propertyId, checkIn, checkOut, guests } = body;

    // Validation
    if (!propertyId || !checkIn || !checkOut || !guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return NextResponse.json(
        { error: 'Check-in date cannot be in the past' },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // Get property details
    const property = await Property.findById(propertyId);
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    if (!property.available) {
      return NextResponse.json(
        { error: 'Property is not available' },
        { status: 400 }
      );
    }

    // Validate guest count
    if (guests > property.guests) {
      return NextResponse.json(
        { error: `Property can accommodate maximum ${property.guests} guests` },
        { status: 400 }
      );
    }

    // Calculate pricing
    const nights = calculateNights(checkInDate, checkOutDate);
    const totalPrice = property.price * nights;
    const serviceFee = Math.round(totalPrice * 0.1); // 10% service fee
    const grandTotal = totalPrice + serviceFee;

    // Generate booking reference
    const bookingReference = generateBookingReference();

    // Create booking
    const booking = await Booking.create({
      propertyId,
      userId: authUser.userId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      nights,
      pricePerNight: property.price,
      totalPrice,
      serviceFee,
      grandTotal,
      status: 'confirmed',
      paymentStatus: 'completed', // Mock payment
      paymentMethod: 'mock_payment',
      bookingReference,
    });

    return NextResponse.json(
      {
        success: true,
        booking: {
          id: booking._id,
          bookingReference: booking.bookingReference,
          propertyId: booking.propertyId,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          guests: booking.guests,
          nights: booking.nights,
          pricePerNight: booking.pricePerNight,
          totalPrice: booking.totalPrice,
          serviceFee: booking.serviceFee,
          grandTotal: booking.grandTotal,
          status: booking.status,
          paymentStatus: booking.paymentStatus,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get user's bookings
export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    
    if (!authUser) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectDB();

    const bookings = await Booking.find({ userId: authUser.userId })
      .populate('propertyId', 'title location image price')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        bookings,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Bookings fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
