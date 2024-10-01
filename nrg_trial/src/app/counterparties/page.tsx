"use client";
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

interface Counterparty {
  id: number;
  name: string;
  type: number;
}

export default function CounterpartiesPage() {
  const [counterparties, setCounterparties] = useState<Counterparty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounterparties = async () => {
      const session = await getSession();
      console.log('Session:', session); // Log de sesión para verificar

      if (!session || !session.accessToken) {
        setError('No estás autorizado');
        setLoading(false);
        return;
      }

      console.log("Access Token:", session.accessToken); // Log del token

      try {
        const response = await fetch('/api/counterparties', {
          headers: {
            Authorization: `Token ${session.accessToken}`, // Asegúrate de usar "Token"
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); // Captura el texto de error
          console.error("Error Response:", errorText); // Log del error
          throw new Error(`Error al obtener los counterparties: ${errorText}`);
        }

        const data = await response.json();
        setCounterparties(data); // Almacena los counterparties en el estado
      } catch (error) {
        console.error("Error fetching counterparties:", error); // Log del error
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchCounterparties();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Counterparties</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {counterparties.map((counterparty) => (
            <tr key={counterparty.id}>
              <td>{counterparty.id}</td>
              <td>{counterparty.name}</td>
              <td>{counterparty.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
