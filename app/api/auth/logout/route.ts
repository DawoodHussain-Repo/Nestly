import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAccessToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const accessToken = request.cookies.get('accessToken')?.value;

    if (accessToken) {
      const payload = verifyAccessToken(accessToken);
      if (payload) {
        // Clear refresh token from database
        await User.findByIdAndUpdate(payload.userId, {
          $unset: { refreshToken: 1 },
        });
      }
    }

    // Create response
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );

    // Clear cookies
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
