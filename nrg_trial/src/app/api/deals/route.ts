import { NextResponse } from 'next/server';
import { getDeals } from '../../services/deal';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route'; // Asegúrate de que esta importación sea correcta

// Ruta para obtener todos los deals
export async function GET(req: Request) {
  const session = await getServerSession(authOptions); // Obtiene la sesión

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const params = url.searchParams.get('scenario') ? `scenario=${url.searchParams.get('scenario')}` : undefined;

    const deals = await getDeals(session.accessToken, params); // Llama a la función para obtener deals
    return NextResponse.json(deals); // Devuelve los deals
  } catch (error) {
    console.error('Error fetching deals:', error);
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
}

