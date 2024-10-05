// // app/deals/page.tsx
// 'use client';
// import { useEffect, useState } from 'react';
// import { getSession } from 'next-auth/react';
// import DealsTable from '../components/DealsTable';
// import DealsFilters from '../components/DealsFilters';
// import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
// import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones

// interface Deal {
//   id: string;
//   code: string;
//   trade_date: string;
//   status: number;
//   proposed_to: number;
//   sense: number;
//   volume: number;
//   fixed_price: number;
//   is_billing: number;
//   is_deleted: boolean;
//   created_at: string;
//   updated_at: string;
//   counterparty: number; // Solo el ID
//   commodity_group: number; // Solo el ID
//   broker: number; // Solo el ID
// }

// export default function DealsPage() {
//   const { currentLang } = useLanguage(); // Obtén el idioma actual
//   const translations = useTranslations(currentLang); // Obtén las traducciones

//   const [deals, setDeals] = useState<Deal[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   const [filters, setFilters] = useState({
//     code: '',
//     status: '',
//     proposed_to: '',
//     sense: '',
//     trade_date: '',
//     trade_date_start: '',
//     trade_date_end: '',
//     created_at_start: '',
//     created_at_end: '',
//     updated_at_start: '',
//     updated_at_end: '',
//   });

//   useEffect(() => {
//     const fetchDeals = async () => {
//       setLoading(true);
//       const session = await getSession();

//       if (!session || !session.accessToken) {
//         setError(translations.error + ' No estás autorizado');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`/api/deals`, {
//           headers: {
//             Authorization: `Token ${session.accessToken}`,
//           },
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`${translations.error} ${errorText}`);
//         }

//         const data = await response.json();
//         setDeals(data);
//       } catch (error) {
//         console.error('Error fetching deals:', error);
//         setError(error instanceof Error ? error.message : 'Error desconocido');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeals();
//   }, [translations]); // Asegúrate de que las traducciones se actualicen al cambiar el idioma

//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const filteredDeals = deals.filter(deal => {
//     const tradeDate = new Date(deal.trade_date);
//     const createdAt = new Date(deal.created_at);
//     const updatedAt = new Date(deal.updated_at);

//     return (
//       (!filters.code || deal.code.includes(filters.code)) &&
//       (!filters.status || deal.status === Number(filters.status)) &&
//       (!filters.proposed_to || deal.proposed_to === Number(filters.proposed_to)) &&
//       (!filters.sense || deal.sense === Number(filters.sense)) &&
//       (!filters.trade_date || deal.trade_date.includes(filters.trade_date)) &&
//       (!filters.trade_date_start || tradeDate >= new Date(filters.trade_date_start)) &&
//       (!filters.trade_date_end || tradeDate <= new Date(filters.trade_date_end)) &&
//       (!filters.created_at_start || createdAt >= new Date(filters.created_at_start)) &&
//       (!filters.created_at_end || createdAt <= new Date(filters.created_at_end)) &&
//       (!filters.updated_at_start || updatedAt >= new Date(filters.updated_at_start)) &&
//       (!filters.updated_at_end || updatedAt <= new Date(filters.updated_at_end))
//     );
//   });

//   if (loading) {
//     return <div>{translations.loading}</div>; // Mensaje de carga traducido
//   }

//   if (error) {
//     return <div>{translations.error}: {error}</div>; // Mensaje de error traducido
//   }

//   return (
//     <div>
//       <h1>{translations.contracts}</h1>

//       {/* Filtros */}
//       <DealsFilters filters={filters} onFilterChange={handleFilterChange} />

//       {/* Tabla de Deals */}
//       <DealsTable deals={filteredDeals} />
//     </div>
//   );
// }

"use client"; // Asegúrate de que este archivo sea un componente de cliente

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import DealsTable from '../components/DealsTable'; // Asegúrate de que la ruta sea correcta
import DealsFilters from '../components/DealsFilters'; // Asegúrate de que la ruta sea correcta
import { useLanguage } from '../context/LanguageContext'; // Importa el contexto de lenguaje
import { useTranslations } from '../../utils/i18n'; // Asegúrate de que esta ruta sea correcta
import Loader from '../components/Loader'; // Asegúrate de importar el Loader

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

