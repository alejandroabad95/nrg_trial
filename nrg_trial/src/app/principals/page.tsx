"use client";

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

interface Principal {
  id: string;
  name: string;
  short_name: string;
}

export default function PrincipalsPage() {
  const [principals, setPrincipals] = useState<Principal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrincipals = async () => {
      setLoading(true);

      try {
        const session = await getSession();
        
        // Log para comprobar la sesión en el cliente
        console.log('Sesión en el cliente:', session);

        if (!session || !session.accessToken) {
          throw new Error('No estás autorizado o no se pudo obtener el token');
        }

        // Llamar a la API interna para obtener los principals
        const response = await fetch(`/api/principals`, {
          headers: {
            Authorization: `Token ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al obtener los principals: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setPrincipals(data);
      } catch (error) {
        console.error("Error fetching principals:", error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchPrincipals();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Principals</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Nombre Corto</th>
          </tr>
        </thead>
        <tbody>
          {principals.map((principal) => (
            <tr key={principal.id}>
              <td>{principal.id}</td>
              <td>{principal.name}</td>
              <td>{principal.short_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
