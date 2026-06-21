import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Only protect the home page route
  if (pathname === '/') {
    // Check for authentication cookie
    const authToken = 
      request.cookies.get('jwt')?.value ||
      request.cookies.get('jwt_ATSresume')?.value;

    // If no auth cookie found, redirect to login
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If user is logged in and tries to access login page, redirect to home
  if (pathname === '/login') {
    const authToken = 
      request.cookies.get('jwt')?.value ||
      request.cookies.get('jwt_ATSresume')?.value;

    if (authToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
