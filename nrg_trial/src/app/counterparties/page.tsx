"use client";

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import CounterpartiesTable from '../components/CounterpartiesTable';
import { useTranslations } from '../../utils/i18n';
import { useLanguage } from '../context/LanguageContext';
import Loader from '../components/Loader'; // Asegúrate de importar el Loader

interface Counterparty {
  id: number;
  name: string;
  type: number;
}

export default function CounterpartiesPage() {
  const { currentLang } = useLanguage();
  const translations = useTranslations(currentLang);
  const [counterparties, setCounterparties] = useState<Counterparty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounterparties = async () => {
      const session = await getSession();

      if (!session || !session.accessToken) {
        // Manejo de sesión
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/counterparties', {
          headers: {
            Authorization: `Token ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener los counterparties`);
        }

        const data = await response.json();
        setCounterparties(data);
      } catch (error) {
        console.error("Error fetching counterparties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounterparties();
  }, [translations]);

  return (
    <div className="m-20">
      <h2>{translations.counterparties}</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-10"> 
          <CounterpartiesTable 
            counterparties={counterparties} 
            translations={translations} 
          />
        </div>
      )}
    </div>
  );
}
