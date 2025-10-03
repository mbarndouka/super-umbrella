import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { env } from '@/lib/env';

// Define the routes that require authentication
const protectedRoutes = ['/dashboard'];

// CSRF protection for state-changing operations
function validateCSRF(request: NextRequest): boolean {
  // For API routes that modify data, check for CSRF token
  if (
    request.method !== 'GET' &&
    request.nextUrl.pathname.startsWith('/api/')
  ) {
    const csrfToken =
      request.headers.get('x-csrf-token') || request.headers.get('csrf-token');

    if (!csrfToken) {
      return false;
    }

    // In a real implementation, you'd validate the token against a server-side store
    // For now, we'll do basic validation
    try {
      jwt.verify(csrfToken, env.jwt.secret);
      return true;
    } catch {
      return false;
    }
  }

  return true;
}

// Validate JWT token from cookies
function validateAuthToken(request: NextRequest): boolean {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, env.jwt.secret);
    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { origin } = request.nextUrl;

  // Security headers (additional layer beyond Next.js config)
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-CSRF-Token'
    );
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }

    // CSRF validation for state-changing operations
    if (!validateCSRF(request)) {
      return new NextResponse(
        JSON.stringify({ error: 'CSRF token validation failed' }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            ...Object.fromEntries(response.headers.entries()),
          },
        }
      );
    }
  }

  // Check if the requested path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Validate authentication for protected routes
  if (isProtectedRoute && !validateAuthToken(request)) {
    // Redirect to signin page
    const signinUrl = new URL('/signin', request.url);
    signinUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signinUrl);
  }

  // Redirect authenticated users away from auth pages
  if (
    (pathname === '/signin' || pathname === '/signup') &&
    validateAuthToken(request)
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - *.svg files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)',
  ],
};
