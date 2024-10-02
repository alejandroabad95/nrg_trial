// app/deals/[id]/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

interface Deal {
  id: string;
  code: string;
  trade_date: string;
  status: number;
  proposed_to: number;
  sense: number;
  volume: number;
  fixed_price: number;
  is_billing: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  counterparty: {
  
    name: string;
    type: number;
  };
  commodity_group: {
    name: string;
    short_name: string;
    measurement_unit: string;
  };
  broker: string;
}

interface DealDetailsPageProps {
  params: {
    id: string; // Definimos que 'id' será un string
  };
}

const statusMap: Record<number, string> = {
  0: 'Inactivo',
  1: 'No Verificado',
  2: 'Verificado',
};

const proposedToMap: Record<number, string> = {
  0: 'Ninguno',
  1: 'Modificación',
  2: 'Eliminado',
};

const senseMap: Record<number, string> = {
  1: 'Compra',
  2: 'Venta',
};

export default function DealDetailsPage({ params }: DealDetailsPageProps) {
  const { id } = params; // Obtiene el ID del deal desde las props
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeal = async () => {
      const session = await getSession();

      if (!session || !session.accessToken) {
        setError('No estás autorizado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/deals/${id}`, {
          headers: {
            Authorization: `Token ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al obtener el deal: ${errorText}`);
        }

        const data = await response.json();
        setDeal(data);
      } catch (error) {
        console.error("Error fetching deal:", error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!deal) {
    return <div>No se encontró el deal.</div>;
  }

  return (
    <div>
      <h1>Detalles del Deal</h1>
      <p>ID: {deal.id}</p>
      <p>Código: {deal.code}</p>
      <p>Fecha de Comercio: {new Date(deal.trade_date).toLocaleDateString()}</p>
      <p>Estado: {statusMap[deal.status] || 'Desconocido'}</p>
      <p>Propuesto a: {proposedToMap[deal.proposed_to] || 'Desconocido'}</p>
      <p>Sentido: {senseMap[deal.sense] || 'Desconocido'}</p>
      <p>Volumen: {deal.volume}</p>
      <p>Precio Fijo: {deal.fixed_price}</p>
      <p>Es Facturación: {deal.is_billing ? 'Sí' : 'No'}</p>
      <p>Es Eliminado: {deal.is_deleted ? 'Sí' : 'No'}</p>
      <p>Creado el: {new Date(deal.created_at).toLocaleDateString()}</p>
      <p>Actualizado el: {new Date(deal.updated_at).toLocaleDateString()}</p>
      
      <h2>Contraparte</h2>
      <p>Nombre: {deal.counterparty.name}</p>
      <p>Tipo: {deal.counterparty.type}</p>

      <h2>Grupo de Mercancías</h2>
      <p>Nombre: {deal.commodity_group.name}</p>
      <p>Nombre Corto: {deal.commodity_group.short_name}</p>
      <p>Unidad de Medida: {deal.commodity_group.measurement_unit}</p>

      <h2>Broker</h2>
      <p>{deal.broker}</p>
    </div>
  );
}
