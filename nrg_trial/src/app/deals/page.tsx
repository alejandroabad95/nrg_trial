"use client"; 
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import DealsTable from '../components/DealsTable';
import DealsFilters from '../components/DealsFilters'; 
import { useLanguage } from '../context/LanguageContext'; 
import { useTranslations } from '../../utils/i18n'; 
import Loader from '../components/Loader';

interface Deal {
  id: string;
  code: string;
  trade_date: string;
  status: number;
  proposed_to: number;
  sense: number;
  volume: number; // Cambia esto a 'number'
  fixed_price: number; // Cambia esto a 'number'
  is_billing: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  counterparty: number; // Solo el ID
  commodity_group: number; // Solo el ID
  broker: number; // Solo el ID
}

interface Filters {
  code: string;
  status: string;
  proposed_to: string;
  sense: string;
  trade_date_start: string;
  trade_date_end: string;
  created_at_start: string;
  created_at_end: string;
  updated_at_start: string;
  updated_at_end: string;
  volume_min: string; 
  volume_max: string; 
  fixed_price_min: string; 
  fixed_price_max: string; 
}

export default function DealsPage() {
  const { currentLang } = useLanguage(); // Obtiene el idioma actual desde el contexto
  const translations = useTranslations(currentLang); // Obtiene las traducciones según el idioma actual
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    code: '',
    status: '',
    proposed_to: '',
    sense: '',
    trade_date_start: '',
    trade_date_end: '',
    created_at_start: '',
    created_at_end: '',
    updated_at_start: '',
    updated_at_end: '',
    volume_min: '',
    volume_max: '',
    fixed_price_min: '',
    fixed_price_max: ''
  });

  useEffect(() => {
    const fetchDeals = async () => {
      const session = await getSession();

      if (!session || !session.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/deals', {
          headers: {
            Authorization: `Token ${session.accessToken}`, // Asegúrate de usar "Token"
          },
        });

        if (!response.ok) {
          throw new Error(translations.fetchError); // Lanza error si la respuesta no es OK
        }

        const data = await response.json();
        setDeals(data); // Almacena los deals en el estado
      } catch (error) {
        console.error("Error fetching deals:", error); // Log del error
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [translations]); // Añade translations como dependencia

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredDeals = deals.filter(deal => {
    return (
      (!filters.code || deal.code.includes(filters.code)) &&
      (!filters.status || deal.status === Number(filters.status)) &&
      (!filters.proposed_to || deal.proposed_to === Number(filters.proposed_to)) &&
      (!filters.sense || deal.sense === Number(filters.sense)) &&
      (!filters.trade_date_start || new Date(deal.trade_date) >= new Date(filters.trade_date_start)) &&
      (!filters.trade_date_end || new Date(deal.trade_date) <= new Date(filters.trade_date_end)) &&
      (!filters.volume_min || deal.volume >= Number(filters.volume_min)) &&
      (!filters.volume_max || deal.volume <= Number(filters.volume_max)) &&
      (!filters.fixed_price_min || deal.fixed_price >= Number(filters.fixed_price_min)) &&
      (!filters.fixed_price_max || deal.fixed_price <= Number(filters.fixed_price_max))
    );
  });

  return (
    <div className="m-10">
      <h2>{translations.contracts}</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-5">
          {/* Filtros */}
          <DealsFilters filters={filters} onFilterChange={handleFilterChange} translations={translations} />
          {/* Tabla de Deals */}
          <DealsTable deals={filteredDeals} translations={translations} />
        </div>
      )}
    </div>
  );
}

