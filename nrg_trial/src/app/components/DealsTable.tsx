// app/deals/DealsTable.tsx
'use client';
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
  is_billing: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  counterparty: number; // Solo el ID
  commodity_group: number; // Solo el ID
  broker: number; // Solo el ID
}

interface DealsTableProps {
  deals: Deal[];
}

const DealsTable: React.FC<DealsTableProps> = ({ deals }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">ID</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">Código</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">Fecha de Comercio</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">Estado</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">Propuesto a</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">Sentido</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">Volumen</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">Precio Fijo</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">Es Facturación</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">Es Eliminado</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">Creado el</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500">Actualizado el</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <DealsRow key={deal.id} deal={deal} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealsTable;
