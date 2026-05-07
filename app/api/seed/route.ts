import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function POST() {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Seeding is only allowed in development' },
        { status: 403 }
      );
    }

    const result = await seedDatabase();
    
    return NextResponse.json(
      {
        success: true,
        message: `Database seeded successfully with ${result.count} properties`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to seed database' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to seed the database' },
    { status: 200 }
  );
}
