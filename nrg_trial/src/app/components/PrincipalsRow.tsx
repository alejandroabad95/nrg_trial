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
    <tr>
      <td>{principal.id}</td>
      <td>{principal.name}</td>
      <td>{principal.short_name}</td>
    </tr>
  );
};

export default PrincipalsRow;



