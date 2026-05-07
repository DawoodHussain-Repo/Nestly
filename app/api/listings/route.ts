import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const requestedLimit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    // Validate and cap limit
    const limit = Math.min(Math.max(1, requestedLimit), 100);

    // Build query
    const query: any = { available: true };

    if (search) {
      // Use text index for better performance and security
      query.$text = { $search: search };
    }

    if (type && type !== 'All Types') {
      query.type = type.toLowerCase();
    }

    // Validate and apply price filters
    if (minPrice || maxPrice) {
      query.price = {};
      
      if (minPrice) {
        const minPriceNum = Number(minPrice);
        if (isNaN(minPriceNum)) {
          return NextResponse.json(
            { error: 'Invalid minPrice parameter' },
            { status: 400 }
          );
        }
        query.price.$gte = minPriceNum;
      }
      
      if (maxPrice) {
        const maxPriceNum = Number(maxPrice);
        if (isNaN(maxPriceNum)) {
          return NextResponse.json(
            { error: 'Invalid maxPrice parameter' },
            { status: 400 }
          );
        }
        query.price.$lte = maxPriceNum;
      }
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [properties, total] = await Promise.all([
      Property.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),
      Property.countDocuments(query),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: properties,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Listings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
