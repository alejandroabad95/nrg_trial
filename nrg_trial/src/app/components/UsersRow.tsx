// components/UsersRow.tsx
import React from 'react';

interface User {
  id: string;
  username: string;
  groups: string[];
  is_staff: boolean;
}

interface UsersRowProps {
  user: User;
  translations: Record<string, string>; // Añadido para recibir las traducciones
}

const UsersRow: React.FC<UsersRowProps> = ({ user, translations }) => {

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.groups.join(', ')}</td>
      <td>{user.is_staff ? translations.yes || 'Sí' : translations.no || 'No'}</td>
    </tr>
  );
};

export default UsersRow;


