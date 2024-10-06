"use client"; 
import React from 'react';

interface Counterparty {
  id: number;
  name: string;
  type: number; 
}

interface CounterpartiesRowProps {
  counterparty: Counterparty;
  translations: { [key: string]: string }; 
}

const CounterpartiesRow: React.FC<CounterpartiesRowProps> = ({ counterparty, translations }) => {
  const typeLabels: { [key: number]: string } = {
    1: translations.typeLabels?.["1"] || "Client", 
    2: translations.typeLabels?.["2"] || "Market", 
    3: translations.typeLabels?.["3"] || "OTC", 
  };

  return (
    <tr>
      <td>{counterparty.id}</td>
      <td>{counterparty.name}</td>
      <td>{typeLabels[counterparty.type] || 'Unknown Type'}</td> {/* Manejo de tipos desconocidos */}
    </tr>
  );
};

export default CounterpartiesRow;
