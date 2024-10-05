// app/deals/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import DealsTable from '../components/DealsTable';
import DealsFilters from '../components/DealsFilters';
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones

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
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones

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
      setLoading(true);
      const session = await getSession();

      if (!session || !session.accessToken) {
        setError(translations.error + ' No estás autorizado');
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
          throw new Error(`${translations.error} ${errorText}`);
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
  }, [translations]); // Asegúrate de que las traducciones se actualicen al cambiar el idioma

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
    return <div>{translations.loading}</div>; // Mensaje de carga traducido
  }

  if (error) {
    return <div>{translations.error}: {error}</div>; // Mensaje de error traducido
  }

  return (
    <div>
      <h1>{translations.contracts}</h1>

      {/* Filtros */}
      <DealsFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Tabla de Deals */}
      <DealsTable deals={filteredDeals} />
    </div>
  );
}
