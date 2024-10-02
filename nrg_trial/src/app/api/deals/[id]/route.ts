import { NextResponse } from 'next/server';
import { getDealById } from '../../../services/deal';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

// Ruta para obtener un deal por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions); // Obtiene la sesión

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params; // Obtiene el ID del parámetro de ruta

  console.log("ID recibido:", id); // Para verificar el ID

  try {
    const deal = await getDealById(session.accessToken, id); // Llama a la función para obtener el deal
    return NextResponse.json(deal); // Devuelve el deal
  } catch (error) {
    console.error('Error fetching deal:', error);
    return NextResponse.json({ error: 'Failed to fetch deal' }, { status: 500 });
  }
}
