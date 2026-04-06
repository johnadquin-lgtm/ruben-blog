import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Permitir acceso a la página de login sin autenticación
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Proteger rutas de admin
  if (pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin_session');

    // Si no hay sesión, redirigir al login
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
