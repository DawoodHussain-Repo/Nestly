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
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    // Build query
    const query: any = { available: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (type && type !== 'All Types') {
      query.type = type.toLowerCase();
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
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
  } catch (error: any) {
    console.error('Listings error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
