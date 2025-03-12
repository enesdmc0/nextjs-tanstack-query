import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/', '/todo'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isAuthenticated = request.cookies.has('pb_auth');

    const isAuthRoute = authRoutes.includes(pathname);
    const isProtectedRoute =
        protectedRoutes.includes(pathname) ||
        (pathname.startsWith("/todo/")) ||
        (pathname !== '/' && protectedRoutes.some(route =>
            pathname.startsWith(route + '/')));

    console.log({
        pathname,
        isAuthenticated,
        isAuthRoute,
        isProtectedRoute
    });

    if (isAuthenticated && isAuthRoute) {
        console.log('Authenticated user trying to access auth route, redirecting to home');
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isAuthenticated && isProtectedRoute) {
        console.log('Unauthenticated user trying to access protected route, redirecting to login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/todo',
        '/todo/:path*',
        '/login',
        '/register',
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};