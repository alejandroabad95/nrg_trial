"use client";
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

interface User {
  id: string;          // El ID del usuario, es un string que representa un UUID
  username: string;    // El nombre de usuario, un string
  groups: string[];    // Un array de strings que representan los grupos a los que pertenece el usuario
  is_staff: boolean;   // Un booleano que indica si el usuario tiene permisos de personal administrativo
}


export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const session = await getSession();
      console.log('Session:', session); // Log de sesión para verificar

      if (!session || !session.accessToken) {
        setError('No estás autorizado');
        setLoading(false);
        return;
      }

      console.log("Access Token:", session.accessToken); // Log del token

      try {
        const response = await fetch('/api/users', {
          headers: {
            Authorization: `Token ${session.accessToken}`, // Asegúrate de usar "Token"
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); // Captura el texto de error
          console.error("Error Response:", errorText); // Log del error
          throw new Error(`Error al obtener los users: ${errorText}`);
        }

        const data = await response.json();
        setUsers(data); // Almacena los users en el estado
      } catch (error) {
        console.error("Error fetching users:", error); // Log del error
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de usuario</th>
            <th>Grupo</th>
            <th>¿Es Staff?</th>
          </tr>
        </thead>
        <tbody>
          {users.map((User) => (
            <tr key={User.id}>
              <td>{User.id}</td>
              <td>{User.username}</td>
              <td>{User.groups}</td>
              <td>{User.is_staff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
