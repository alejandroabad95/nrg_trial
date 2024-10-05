import React from 'react';
import DealsRow from './DealsRow';

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

interface DealsTableProps {
  deals: Deal[];
  translations: Record<string, string>;
}

const DealsTable: React.FC<DealsTableProps> = ({ deals, translations }) => {
  return (
    <table className='max-w-full'>
      <thead>
        <tr>
          <th>ID</th>
          <th>{translations.code}</th>
          <th>{translations.trade_date}</th>
          <th>{translations.status}</th>
          <th>{translations.proposed_to}</th>
          <th>{translations.sense}</th>
          <th>{translations.volume}</th>
          <th>{translations.fixed_price}</th>
        </tr>
      </thead>
      <tbody>
        {deals.map(deal => (
          <DealsRow key={deal.id} deal={deal} translations={translations} />
        ))}
      </tbody>
    </table>
  );
};

export default DealsTable;
