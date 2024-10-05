'use client'; // Asegúrate de que este componente sea un cliente

import React from 'react';
import { useRouter } from 'next/navigation';

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
  translations: Record<string, string>; // Añadido para recibir las traducciones
}

const DealsRow: React.FC<DealsRowProps> = ({ deal, translations }) => {
  const router = useRouter();

  const statusLabels: { [key: number]: string } = {
    0: translations.inactive || 'Inactivo',
    1: translations.unverified || 'No Verificado',
    2: translations.verified || 'Verificado',
  };

  const senseLabels: { [key: number]: string } = {
    1: translations.buy || 'Compra',
    2: translations.sell || 'Venta',
  };

  const handleRowClick = () => {
    router.push(`/deals/${deal.id}`);
  };

  return (
    <tr>
      {/* <td onClick={handleRowClick}>{deal.id}</td> */}

      <td className='' onClick={() => handleRowClick()}>
        <span className=''>{deal.id}</span>
      </td>

      
      <td>{deal.code}</td>
      <td>{new Date(deal.trade_date).toLocaleDateString()}</td>
      <td>{statusLabels[deal.status]}</td>
      <td>{deal.proposed_to}</td>
      <td>{senseLabels[deal.sense]}</td>
      <td>{deal.volume}</td>
      <td>{deal.fixed_price}</td>
    </tr>
  );
};

export default DealsRow;
