import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Define the routes that require admin access
const adminRoutes = ['/admin'];
const authRoutes = ['/auth/signin', '/auth/signup'];
const publicRoutes = ['/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is an admin route
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Skip middleware for public routes and auth routes
  if (
    publicRoutes.includes(pathname) ||
    authRoutes.some(route => pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // Get the token from the request
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Redirect to signin if not authenticated
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(signInUrl);
  }

  // Check for admin routes
  if (isAdminRoute) {
    // Check if user is admin
    const isAdmin = token.role === 'admin' || token.isAdmin === true;
    
    if (!isAdmin) {
      // Redirect non-admin users to home page with unauthorized message
      const url = new URL('/', request.url);
      url.searchParams.set('unauthorized', 'true');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configure which routes the middleware will run on
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
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
