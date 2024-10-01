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
  counterparty: number;
  commodity_group: number;
  broker: number;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeals = async () => {
      const session = await getSession();
      console.log('Session:', session); // Log de sesión para verificar

      if (!session || !session.accessToken) {
        setError('No estás autorizado');
        setLoading(false);
        return;
      }

      console.log("Access Token:", session.accessToken); // Log del token

      try {
        const response = await fetch(`/api/deals?scenario=datatable`, {
          headers: {
            Authorization: `Token ${session.accessToken}`, // Asegúrate de usar "Token"
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); // Captura el texto de error
          console.error("Error Response:", errorText); // Log del error
          throw new Error(`Error al obtener los deals: ${errorText}`);
        }

        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error("Error fetching deals:", error); // Log del error
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Deals</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Fecha de Comercio</th>
            <th>Estado</th>
            <th>Propuesto a</th>
            <th>Sentido</th>
            <th>Volumen</th>
            <th>Precio Fijo</th>
            <th>Es Facturación</th>
            <th>Es Eliminado</th>
            <th>Creado el</th>
            <th>Actualizado el</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id}>
              <td>{deal.id}</td>
              <td>{deal.code}</td>
              <td>{new Date(deal.trade_date).toLocaleDateString()}</td>
              <td>{deal.status}</td>
              <td>{deal.proposed_to}</td>
              <td>{deal.sense}</td>
              <td>{deal.volume}</td>
              <td>{deal.fixed_price}</td>
              <td>{deal.is_billing ? 'Sí' : 'No'}</td>
              <td>{deal.is_deleted ? 'Sí' : 'No'}</td>
              <td>{new Date(deal.created_at).toLocaleDateString()}</td>
              <td>{new Date(deal.updated_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
