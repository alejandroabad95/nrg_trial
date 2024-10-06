// components/UsersTable.tsx
import React from 'react';
import UsersRow from './UsersRow'; 

interface User {
  id: string;
  username: string;
  groups: string[];
  is_staff: boolean;
}

interface UsersTableProps {
  users: User[];
  translations: Record<string, string>;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, translations }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>{translations.username || 'Nombre de usuario'}</th>
            <th>{translations.group || 'Grupo'}</th>
            <th>{translations.isStaff || '¿Es Staff?'}</th>
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
