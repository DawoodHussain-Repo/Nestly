import { verifyAccessToken } from './jwt';
import { NextRequest, NextResponse } from 'next/server';

export function withAuth(
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const token = req.cookies.get('accessToken')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const payload = verifyAccessToken(token);
    
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    
    return handler(req, payload.userId);
  };
}

export function getAuthUser(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  
  if (!token) {
    return null;
  }
  
  return verifyAccessToken(token);
}
