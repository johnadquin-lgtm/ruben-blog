import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Ruben*26';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validar credenciales
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Crear respuesta con cookie de sesión
      const response = NextResponse.json(
        { success: true, message: 'Login exitoso' },
        { status: 200 }
      );

      // Establecer cookie de autenticación
      response.cookies.set({
        name: 'admin_session',
        value: btoa(`${username}:${password}`), // Simple encoding
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 días
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Usuario o contraseña incorrectos' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
