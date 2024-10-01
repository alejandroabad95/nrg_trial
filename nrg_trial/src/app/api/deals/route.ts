import { NextResponse } from 'next/server';
import { getDeals, getDealById } from '../../services/deal';
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

// Nueva ruta para obtener un deal por ID
export async function GET_DEAL_BY_ID(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions); // Obtiene la sesión

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params; // Obtiene el ID del parámetro de ruta

  try {
    const deal = await getDealById(session.accessToken, id); // Llama a la función para obtener el deal
    return NextResponse.json(deal); // Devuelve el deal
  } catch (error) {
    console.error('Error fetching deal:', error);
    return NextResponse.json({ error: 'Failed to fetch deal' }, { status: 500 });
  }
}
