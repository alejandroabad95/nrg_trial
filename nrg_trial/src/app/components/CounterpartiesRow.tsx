"use client"; // Asegúrate de que este componente sea un cliente

import React from 'react';

interface Counterparty {
  id: number;
  name: string;
  type: number; 
}

interface CounterpartiesRowProps {
  counterparty: Counterparty;
  translations: { [key: string]: string }; // Agregar el tipo para las traducciones
}

const CounterpartiesRow: React.FC<CounterpartiesRowProps> = ({ counterparty, translations }) => {
  const typeLabels: { [key: number]: string } = {
    1: translations.typeLabels?.["1"] || "Client", // Valor por defecto
    2: translations.typeLabels?.["2"] || "Market", // Valor por defecto
    3: translations.typeLabels?.["3"] || "OTC", // Valor por defecto
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
