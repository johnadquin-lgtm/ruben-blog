import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Sesión cerrada' });

  // Eliminar la cookie de sesión
  response.cookies.set({
    name: 'admin_session',
    value: '',
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
