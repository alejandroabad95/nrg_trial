import React from 'react';
import PrincipalsRow from './PrincipalsRow'; 

interface Principal {
  id: string;
  name: string;
  short_name: string;
}

interface PrincipalsTableProps {
  principals: Principal[];
  translations: Record<string, string>; 
}

const PrincipalsTable: React.FC<PrincipalsTableProps> = ({ principals, translations }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>{translations.name}</th> 
            <th>{translations.shortName}</th> 
          </tr>
        </thead>
        <tbody>
          {principals.map((principal) => (
            <PrincipalsRow key={principal.id} principal={principal} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrincipalsTable;
