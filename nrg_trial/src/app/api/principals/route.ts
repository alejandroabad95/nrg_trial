import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { getPrincipals } from '../../services/principal';

export async function GET() {
  try {
    // Obtener la sesión en el servidor
    const session = await getServerSession(authOptions);

    // Log para ver si la sesión se está obteniendo correctamente
    console.log("Sesión obtenida en /api/principals:", session);

    if (!session || !session.accessToken) {
      console.error("Sesión o accessToken no disponible");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Llamar al servicio para obtener los datos de principals
    const principals = await getPrincipals(session.accessToken);
    
    // Verificar el resultado del servicio antes de devolver la respuesta
    console.log("Datos obtenidos de getPrincipals:", principals);
    return NextResponse.json(principals);
  } catch (error) {
    console.error('Error al obtener principals:', error);
    return NextResponse.json({ error: 'Failed to fetch principals' }, { status: 500 });
  }
}
