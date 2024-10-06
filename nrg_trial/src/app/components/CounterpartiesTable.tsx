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
  translations: { [key: string]: string };
}

const CounterpartiesTable: React.FC<CounterpartiesTableProps> = ({ counterparties, translations }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th> 
          <th>{translations.name}</th> 
          <th>{translations.type}</th> 
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
