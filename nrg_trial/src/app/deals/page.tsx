// app/deals/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import DealsTable from '../components/DealsTable';

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

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    code: '',
    status: '',
    proposed_to: '',
    sense: '',
    trade_date: '',
    trade_date_start: '',
    trade_date_end: '',
    created_at_start: '',
    created_at_end: '',
    updated_at_start: '',
    updated_at_end: '',
  });

  useEffect(() => {
    const fetchDeals = async () => {
      const session = await getSession();

      if (!session || !session.accessToken) {
        setError('No estás autorizado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/deals`, {
          headers: {
            Authorization: `Token ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al obtener los deals: ${errorText}`);
        }

        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredDeals = deals.filter(deal => {
    const tradeDate = new Date(deal.trade_date);
    const createdAt = new Date(deal.created_at);
    const updatedAt = new Date(deal.updated_at);

    return (
      (!filters.code || deal.code.includes(filters.code)) &&
      (!filters.status || deal.status === Number(filters.status)) &&
      (!filters.proposed_to || deal.proposed_to === Number(filters.proposed_to)) &&
      (!filters.sense || deal.sense === Number(filters.sense)) &&
      (!filters.trade_date || deal.trade_date.includes(filters.trade_date)) &&
      (!filters.trade_date_start || tradeDate >= new Date(filters.trade_date_start)) &&
      (!filters.trade_date_end || tradeDate <= new Date(filters.trade_date_end)) &&
      (!filters.created_at_start || createdAt >= new Date(filters.created_at_start)) &&
      (!filters.created_at_end || createdAt <= new Date(filters.created_at_end)) &&
      (!filters.updated_at_start || updatedAt >= new Date(filters.updated_at_start)) &&
      (!filters.updated_at_end || updatedAt <= new Date(filters.updated_at_end))
    );
  });

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de Deals</h1>

      {/* Filtros */}
      <div className="mb-4">
        <input
          type="text"
          name="code"
          value={filters.code}
          onChange={handleFilterChange}
          placeholder="Código"
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <select name="status" value={filters.status} onChange={handleFilterChange} className="border border-gray-300 rounded px-2 py-1 mr-2">
          <option value="">Estado</option>
          <option value="0">Inactive</option>
          <option value="1">Unverified</option>
          <option value="2">Verified</option>
        </select>
        <select name="proposed_to" value={filters.proposed_to} onChange={handleFilterChange} className="border border-gray-300 rounded px-2 py-1 mr-2">
          <option value="">Propuesto a</option>
          <option value="0">None</option>
          <option value="1">Amendment</option>
          <option value="2">Deleted</option>
        </select>
        <select name="sense" value={filters.sense} onChange={handleFilterChange} className="border border-gray-300 rounded px-2 py-1 mr-2">
          <option value="">Sentido</option>
          <option value="1">Buy</option>
          <option value="2">Sell</option>
        </select>
      </div>

      {/* Filtros de Fechas */}
      <div className="mb-4">
        <h2>Filtros de Fechas</h2>
        <label className="mr-2">Fecha de Comercio:</label>
        <input
          type="date"
          name="trade_date_start"
          value={filters.trade_date_start}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
          placeholder="Desde"
        />
        <input
          type="date"
          name="trade_date_end"
          value={filters.trade_date_end}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
          placeholder="Hasta"
        />

        <div className="mt-2">
          <label className="mr-2">Creación:</label>
          <input
            type="date"
            name="created_at_start"
            value={filters.created_at_start}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
            placeholder="Desde"
          />
          <input
            type="date"
            name="created_at_end"
            value={filters.created_at_end}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
            placeholder="Hasta"
          />
        </div>

        <div className="mt-2">
          <label className="mr-2">Actualización:</label>
          <input
            type="date"
            name="updated_at_start"
            value={filters.updated_at_start}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
            placeholder="Desde"
          />
          <input
            type="date"
            name="updated_at_end"
            value={filters.updated_at_end}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
            placeholder="Hasta"
          />
        </div>
      </div>

      <DealsTable deals={filteredDeals} />
    </div>
  );
}
