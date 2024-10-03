"use client"; // Marca el archivo como un componente de cliente

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import CounterpartiesTable from '../components/CounterpartiesTable';
import { useTranslations } from '../../utils/i18n'; // Asegúrate de que este hook exista
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje

interface Counterparty {
  id: number;
  name: string;
  type: number;
}

export default function CounterpartiesPage() {
  const [counterparties, setCounterparties] = useState<Counterparty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones

  useEffect(() => {
    const fetchCounterparties = async () => {
      const session = await getSession();

      if (!session || !session.accessToken) {
        setError(translations.notAuthorized); // Usar la traducción aquí
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
          const errorText = await response.text();
          console.error("Error Response:", errorText);
          throw new Error(`Error al obtener los counterparties: ${errorText}`);
        }

        const data = await response.json();
        setCounterparties(data);
      } catch (error) {
        console.error("Error fetching counterparties:", error);
        setError(error instanceof Error ? error.message : translations.error); // Usar la traducción aquí
      } finally {
        setLoading(false);
      }
    };

    fetchCounterparties();
  }, [translations]); // Asegúrate de que el efecto se dispare si las traducciones cambian

  if (loading) {
    return <div>{translations.loading}</div>; // Usar la traducción aquí
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="m-4">
      <h1>{translations.counterparties}</h1>
      <CounterpartiesTable counterparties={counterparties} />
    </div>
  );
}
