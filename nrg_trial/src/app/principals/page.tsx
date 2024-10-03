"use client";

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import PrincipalsTable from '../components/PrincipalsTable'; // Importa el componente de tabla
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones

interface Principal {
  id: string;
  name: string;
  short_name: string;
}

export default function PrincipalsPage() {
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones

  const [principals, setPrincipals] = useState<Principal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrincipals = async () => {
      setLoading(true);

      try {
        const session = await getSession();

        if (!session || !session.accessToken) {
          throw new Error('No estás autorizado o no se pudo obtener el token');
        }

        // Llamar a la API interna para obtener los principals
        const response = await fetch(`/api/principals`, {
          headers: {
            Authorization: `Token ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al obtener los principals: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setPrincipals(data);
      } catch (error) {
        console.error("Error fetching principals:", error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchPrincipals();
  }, []);

  if (loading) {
    return <div>{translations.loading}</div>; // Mensaje de carga traducido
  }

  if (error) {
    return <div>{translations.error}: {error}</div>; // Mensaje de error traducido
  }

  return (
    <div className="container mx-auto max-w-4xl mt-10">
      <h1 className="text-2xl font-bold mb-4">{translations.principals || 'Principals'}</h1>
      <PrincipalsTable principals={principals} />
    </div>
  );
}
