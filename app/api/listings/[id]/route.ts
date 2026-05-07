import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const property = await Property.findById(id).lean();

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: property,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Property fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
