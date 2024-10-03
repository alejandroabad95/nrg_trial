// components/UsersTable.tsx
import React from 'react';
import UsersRow from './UsersRow'; // Asegúrate de que la ruta sea correcta

interface User {
  id: string;
  username: string;
  groups: string[];
  is_staff: boolean;
}

interface UsersTableProps {
  users: User[];
  translations: Record<string, string>; // Añadido para recibir las traducciones
}

const UsersTable: React.FC<UsersTableProps> = ({ users, translations }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">{translations.username || 'Nombre de usuario'}</th>
            <th className="p-2 text-left">{translations.group || 'Grupo'}</th>
            <th className="p-2 text-left">{translations.isStaff || '¿Es Staff?'}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UsersRow key={user.id} user={user} translations={translations} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
