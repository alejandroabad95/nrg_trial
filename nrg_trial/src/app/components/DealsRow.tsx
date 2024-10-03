// components/DealsRow.tsx
'use client'; // Asegúrate de que este componente sea un cliente

import React from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de importar desde next/navigation

interface Deal {
  id: string;
  code: string;
  trade_date: string;
  status: number;
  proposed_to: number;
  sense: number;
  volume: number;
  fixed_price: number;
}

interface DealsRowProps {
  deal: Deal;
}

const DealsRow: React.FC<DealsRowProps> = ({ deal }) => {
  const router = useRouter(); // Inicializa el router

  // Etiquetas de estado y sentido
  const statusLabels: { [key: number]: string } = {
    0: 'Inactivo',
    1: 'No Verificado',
    2: 'Verificado',
  };

  const senseLabels: { [key: number]: string } = {
    1: 'Compra',
    2: 'Venta',
  };

  const handleRowClick = () => {
    router.push(`/deals/${deal.id}`); // Redirige a la página de detalles del deal
  };

  return (
    <tr className="border-b hover:bg-gray-100 cursor-pointer" onClick={handleRowClick}>
      <td className="p-2">{deal.id}</td> {/* ID */}
      <td className="p-2">{deal.code}</td> {/* Código */}
      <td className="p-2">{new Date(deal.trade_date).toLocaleDateString()}</td> {/* Fecha de Comercio */}
      <td className="p-2">{statusLabels[deal.status]}</td> {/* Estado */}
      <td className="p-2">{deal.proposed_to}</td> {/* Propuesto a */}
      <td className="p-2">{senseLabels[deal.sense]}</td> {/* Sentido */}
      <td className="p-2">{deal.volume}</td> {/* Volumen */}
      <td className="p-2">{deal.fixed_price}</td> {/* Precio Fijo */}
    </tr>
  );
};

export default DealsRow;
