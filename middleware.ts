import { NextRequest, NextResponse } from "next/server";

// Define the routes that require authentication
const protectedRoutes = ["/dashboard"];

// Define public routes that should be accessible without authentication
const publicRoutes = ["/signin", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // If trying to access a protected route, we'll let the client-side auth check handle it
  // This is because we're using localStorage/sessionStorage for auth tokens
  // The dashboard layout will check for authentication and redirect if needed

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)",
  ],
};
