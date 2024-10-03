// components/PrincipalsRow.tsx
import React from 'react';

interface Principal {
  id: string;
  name: string;
  short_name: string;
}

interface PrincipalsRowProps {
  principal: Principal;
}

const PrincipalsRow: React.FC<PrincipalsRowProps> = ({ principal }) => {
  return (
    <tr className="bg-gray-200">
      <td className="p-2">{principal.id}</td>
      <td className="p-2">{principal.name}</td>
      <td className="p-2">{principal.short_name}</td>
    </tr>
  );
};

export default PrincipalsRow;
