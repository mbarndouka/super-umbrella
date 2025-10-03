import rateLimit from 'express-rate-limit';
import { NextRequest } from 'next/server';

// Rate limiting configurations
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs for auth endpoints
  message: {
    error: 'Too many authentication attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs for general API
  message: {
    error: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// In-memory store for rate limiting (for development)
// In production, use Redis or similar
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetTime) {
    // First request or window expired
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true };
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, resetTime: existing.resetTime };
  }

  existing.count++;
  return { allowed: true };
}

// Middleware function for Next.js API routes
export async function withRateLimit(
  request: NextRequest,
  handler: () => Promise<Response>,
  options: { maxRequests: number; windowMs: number }
): Promise<Response> {
  const ip =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const key = `${ip}:${request.nextUrl.pathname}`;
  const { allowed, resetTime } = checkRateLimit(
    key,
    options.maxRequests,
    options.windowMs
  );

  if (!allowed) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests, please try again later.',
        resetTime,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((resetTime! - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  return handler();
}
