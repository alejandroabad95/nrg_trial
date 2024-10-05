// components/CounterpartiesTable.tsx
import React from 'react';
import CounterpartiesRow from './CounterpartiesRow';

interface Counterparty {
  id: number;
  name: string;
  type: number;
}

interface CounterpartiesTableProps {
  counterparties: Counterparty[];
  translations: { [key: string]: string }; // Agrega el tipo para las traducciones
}

const CounterpartiesTable: React.FC<CounterpartiesTableProps> = ({ counterparties, translations }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th> {/* Sin traducción */}
          <th>{translations.name}</th> {/* Traducción para Nombre */}
          <th>{translations.type}</th> {/* Traducción para Tipo */}
        </tr>
      </thead>
      <tbody>
        {counterparties.map(counterparty => (
          <CounterpartiesRow key={counterparty.id} counterparty={counterparty} translations={translations} /> 
        ))}
      </tbody>
    </table>
  );
};

export default CounterpartiesTable;
