// components/CounterpartiesRow.tsx
import React from 'react';

interface Counterparty {
  id: number;
  name: string;
  type: number;
}

interface CounterpartiesRowProps {
  counterparty: Counterparty;
}

const CounterpartiesRow: React.FC<CounterpartiesRowProps> = ({ counterparty }) => {
  return (
    <tr>
      <td className="p-2 border border-gray-200">{counterparty.id}</td>
      <td className="p-2 border border-gray-200">{counterparty.name}</td>
      <td className="p-2 border border-gray-200">{counterparty.type}</td>
    </tr>
  );
};

export default CounterpartiesRow;
