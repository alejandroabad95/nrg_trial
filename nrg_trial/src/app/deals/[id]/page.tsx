"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importamos useRouter
import { getSession } from 'next-auth/react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTranslations } from '../../../utils/i18n'; 
import styles from '../../styles/componentStyles/Deals.module.scss';
import Loader from '@/app/components/Loader';

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
  const router = useRouter(); // Inicializa el router para la navegación

  const { id } = params; // Obtiene el ID del deal desde las props
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeal = async () => {
      const session = await getSession();

      if (!session || !session.accessToken) {
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
          throw new Error(translations.error); // Mensaje de error traducido
        }

        const data = await response.json();
        setDeal(data);
      } catch (error) {
        console.error("Error fetching deal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id, translations]); // Asegúrate de que las traducciones se actualicen al cambiar el idioma

  return (

      <>

      


    <div className="m-20">
        
      <button onClick={() => router.back()} className={`${styles.goBackButton}`} >
        ⬅️ {translations.goBack}
      </button>



      <h1>{translations.dealDetails}</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className=''>
          <div className={`${styles.dealContainer} mt-1`}>
            <p>ID: <span>{deal?.id}</span></p>
            <p>{translations.code}: <span>{deal?.code}</span></p>
            <p>{translations.trade_date}: <span>{deal?.trade_date ? new Date(deal?.trade_date).toLocaleDateString() : 'N/A'}</span></p>
            <p>{translations.status}: <span>{translations[deal?.status === 0 ? 'inactive' : deal?.status === 1 ? 'unverified' : 'verified']}</span></p>
            <p>{translations.proposed_to}: <span>{translations[deal?.proposed_to === 0 ? 'none' : deal?.proposed_to === 1 ? 'amendment' : 'deleted']}</span></p>
            <p>{translations.sense}: <span>{translations[deal?.sense === 1 ? 'buy' : 'sell']}</span></p>
            <p>{translations.volume}: <span>{deal?.volume}</span></p>
            <p>{translations.fixed_price}: <span>{deal?.fixed_price}</span></p>
            <p>{translations.isBilling}: <span>{deal?.is_billing ? translations.yes : translations.no}</span></p>
            <p>{translations.isDeleted}: <span>{deal?.is_deleted ? translations.yes : translations.no}</span></p>
            <p>{translations.creation}: <span>{deal?.created_at ? new Date(deal.created_at).toLocaleDateString() : 'N/A'}</span></p>
            <p>{translations.update}: <span>{deal?.updated_at ? new Date(deal.updated_at).toLocaleDateString() : 'N/A'}</span></p>
          </div>

          <h4 className='mt-2'>{translations.counterparties}</h4>
          <div className={`${styles.dealContainer} mt-2`}>
            <p>{translations.name}: <span>{deal?.counterparty.name}</span></p>
            <p>{translations.type}: <span>{deal?.counterparty.type}</span></p>
          </div>

          <h4>{translations.commodityGroup}</h4>
          <div className={`${styles.dealContainer} mt-2`}>
            <p>{translations.name}: <span>{deal?.commodity_group.name}</span></p>
            <p>{translations.shortName}: <span>{deal?.commodity_group.short_name}</span></p>
            <p>{translations.measurementUnit}: <span>{deal?.commodity_group.measurement_unit}</span></p>
          </div>

          <h4>Broker</h4>
          <div className={`${styles.dealContainer} mt-2`}>
            <p><span>{deal?.broker}</span></p>
          </div>
        </div>
      )}
      </div>
      
    </>
  );
}
