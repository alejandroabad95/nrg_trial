import { NextResponse } from 'next/server';
import { getCounterparties } from '../../services/counterparty'; // Asegúrate de que la ruta sea correcta
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route'; // Asegúrate de que la ruta sea correcta

export async function GET() {
  // Obtén la sesión del servidor
  const session = await getServerSession(authOptions); // Asegúrate de pasar las opciones correctamente

  console.log("Session:", session); // Log de la sesión para depuración

  // Verifica si hay sesión y si el accessToken está disponible
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log("Session Access Token:", session.accessToken); // Log para verificar el token de sesión

  try {
    // Llamar a la función de servicio para obtener los counterparties
    const counterparties = await getCounterparties(session.accessToken);
    return NextResponse.json(counterparties); // Devolver los counterparties como respuesta
  } catch (error) {
    console.error('Error fetching counterparties:', error);
    return NextResponse.json({ error: 'Failed to fetch counterparties' }, { status: 500 });
  }
}
