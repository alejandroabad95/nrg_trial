// app/deals/DealsRow.tsx
'use client';
import Link from 'next/link';

interface Deal {
  id: string;
  code: string;
  trade_date: string;
  status: number;
  proposed_to: number;
  sense: number;
  volume: number;
  fixed_price: number;
  is_billing: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  counterparty: number; // Solo el ID
  commodity_group: number; // Solo el ID
  broker: number; // Solo el ID
}

interface DealsRowProps {
  deal: Deal;
}

const statusMap: { [key: number]: string } = {
  0: "Inactive",
  1: "Unverified",
  2: "Verified",
};

const proposedToMap: { [key: number]: string } = {
  0: "None",
  1: "Amendment",
  2: "Deleted",
};

const senseMap: { [key: number]: string } = {
  1: "Buy",
  2: "Sell",
};

const DealsRow: React.FC<DealsRowProps> = ({ deal }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 border-b border-gray-200">
        <Link href={`/deals/${deal.id}`}>{deal.id}</Link>
      </td>
      <td className="px-6 py-4 border-b border-gray-200">{deal.code}</td>
      <td className="px-6 py-4 border-b border-gray-200">
        {new Date(deal.trade_date).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 border-b border-gray-200">{statusMap[deal.status]}</td>
      <td className="px-6 py-4 border-b border-gray-200">{proposedToMap[deal.proposed_to]}</td>
      <td className="px-6 py-4 border-b border-gray-200">{senseMap[deal.sense]}</td>
      <td className="px-6 py-4 border-b border-gray-200">{deal.volume}</td>
      <td className="px-6 py-4 border-b border-gray-200">{deal.fixed_price}</td>
      <td className="px-6 py-4 border-b border-gray-200">{deal.is_billing ? 'Sí' : 'No'}</td>
      <td className="px-6 py-4 border-b border-gray-200">{deal.is_deleted ? 'Sí' : 'No'}</td>
      <td className="px-6 py-4 border-b border-gray-200">
        {new Date(deal.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 border-b border-gray-200">
        {new Date(deal.updated_at).toLocaleDateString()}
      </td>
    </tr>
  );
};

export default DealsRow;
