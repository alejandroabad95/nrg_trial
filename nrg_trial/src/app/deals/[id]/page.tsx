"use client";
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTranslations } from '../../../utils/i18n'; // Importa el hook de traducciones

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
  counterparty: {
    name: string;
    type: number;
  };
  commodity_group: {
    name: string;
    short_name: string;
    measurement_unit: string;
  };
  broker: string;
}

interface DealDetailsPageProps {
  params: {
    id: string; // Definimos que 'id' será un string
  };
}

export default function DealDetailsPage({ params }: DealDetailsPageProps) {
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones

  const { id } = params; // Obtiene el ID del deal desde las props
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeal = async () => {
      const session = await getSession();

      if (!session || !session.accessToken) {
        setError(translations.notAuthorized); // Mensaje de error traducido
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/deals/${id}`, {
          headers: {
            Authorization: `Token ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`${translations.error} ${errorText}`); // Mensaje de error traducido
        }

        const data = await response.json();
        setDeal(data);
      } catch (error) {
        console.error("Error fetching deal:", error);
        setError(error instanceof Error ? error.message : translations.error); // Mensaje de error traducido
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id, translations]); // Asegúrate de que las traducciones se actualicen al cambiar el idioma

  if (loading) {
    return <div>{translations.loading}</div>; // Mensaje de carga traducido
  }

  if (error) {
    return <div>{translations.error}: {error}</div>; // Mensaje de error traducido
  }

  if (!deal) {
    return <div>{translations.error}: {translations.notAuthorized}</div>; // Mensaje de no encontrado traducido
  }

  return (
    <div>
      <h1>{translations.dealDetails}</h1>
      <p>ID: {deal.id}</p>
      <p>{translations.code}: {deal.code}</p>
      <p>{translations.trade_date}: {new Date(deal.trade_date).toLocaleDateString()}</p>
      <p>{translations.status}: {translations[deal.status === 0 ? 'inactive' : deal.status === 1 ? 'unverified' : 'verified']}</p>
      <p>{translations.proposed_to}: {translations[deal.proposed_to === 0 ? 'none' : deal.proposed_to === 1 ? 'amendment' : 'deleted']}</p>
      <p>{translations.sense}: {translations[deal.sense === 1 ? 'buy' : 'sell']}</p>
      <p>{translations.volume}: {deal.volume}</p>
      <p>{translations.fixed_price}: {deal.fixed_price}</p>
      <p>{translations.isBilling}: {deal.is_billing ? translations.yes : translations.no}</p>
      <p>{translations.isDeleted}: {deal.is_deleted ? translations.yes : translations.no}</p>
      <p>{translations.creation}: {new Date(deal.created_at).toLocaleDateString()}</p>
      <p>{translations.update}: {new Date(deal.updated_at).toLocaleDateString()}</p>
      
      <h2>{translations.counterparties}</h2>
      <p>{translations.name}: {deal.counterparty.name}</p>
      <p>{translations.type}: {deal.counterparty.type}</p>

      <h2>{translations.commodityGroup}</h2>
      <p>{translations.name}: {deal.commodity_group.name}</p>
      <p>{translations.shortName}: {deal.commodity_group.short_name}</p>
      <p>{translations.measurementUnit}: {deal.commodity_group.measurement_unit}</p>

      <h2>{translations.broker}</h2>
      <p>{deal.broker}</p>
    </div>
  );
}
