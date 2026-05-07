import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function POST(request: Request) {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Seeding is only allowed in development' },
        { status: 403 }
      );
    }

    // Require seed key for additional security
    const seedKey = request.headers.get('x-seed-key');
    if (seedKey !== process.env.SEED_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid seed key' },
        { status: 401 }
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
  } catch (error: unknown) {
    console.error('Seed error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to seed database' },
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
