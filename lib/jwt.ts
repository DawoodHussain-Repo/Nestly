import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('JWT secrets are not defined. Set ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET in environment variables.');
}

const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days

export interface TokenPayload {
  userId: string;
  email: string;
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET as string, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET as string, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET as string);
    return decoded as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET as string);
    return decoded as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function generateTokens(payload: TokenPayload) {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}
