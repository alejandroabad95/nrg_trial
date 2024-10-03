import { NextResponse } from 'next/server';
import { getUsers } from '../../services/user'; // Asegúrate de que la ruta sea correcta
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route'; // Asegúrate de que la ruta sea correcta

export async function GET() {
  // Obtén la sesión del servidor
  const session = await getServerSession(authOptions); // Asegúrate de pasar las opciones correctamente



  // Verifica si hay sesión y si el accessToken está disponible
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }



  try {
    // Llamar a la función de servicio para obtener los counterparties
    const users = await getUsers(session.accessToken);
    return NextResponse.json(users); // Devolver los counterparties como respuesta
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
