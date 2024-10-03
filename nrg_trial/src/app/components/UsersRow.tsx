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
    <tr className="border-b hover:bg-gray-100">
      <td className="p-2">{user.id}</td>
      <td className="p-2">{user.username}</td>
      <td className="p-2">{user.groups.join(', ')}</td>
      <td className="p-2">{user.is_staff ? translations.yes || 'Sí' : translations.no || 'No'}</td>
    </tr>
  );
};

export default UsersRow;


