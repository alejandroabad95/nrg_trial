// src/app/middleware.ts

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Obtén el token del usuario
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Definimos las rutas protegidas
  const protectedRoutes = ['/deals', '/counterparties', '/users', '/principals','/change-password'];

  // Comprobar si el usuario no está autenticado
  if (!token) {
    // Redirige a la página de login si intenta acceder a cualquier ruta protegida
    if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {
    // Si el usuario está autenticado, verifica los grupos
    const userGroups = Array.isArray(token.groups) ? token.groups : [];

    // Redirigir a usuarios no autorizados para las rutas 'users' y 'principals'
    const restrictedRoutes = ['/users', '/principals'];
    if (restrictedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !userGroups.includes(1)) {
      return NextResponse.redirect(new URL('/', req.url)); // Redirigir a la página de inicio
    }
  }

  return NextResponse.next();
}

// Define las rutas que deben utilizar este middleware
export const config = {
  matcher: ['/deals', '/counterparties', '/users', '/principals','/change-password'], // Añade todas las rutas que desees proteger
};
