"use client"; // Asegúrate de que este archivo sea un componente de cliente

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import PrincipalsTable from '../components/PrincipalsTable'; // Asegúrate de que la ruta sea correcta
import { useLanguage } from '../context/LanguageContext'; // Importa el contexto de lenguaje
import { useTranslations } from '../../utils/i18n'; // Asegúrate de que esta ruta sea correcta
import Loader from '../components/Loader'; // Asegúrate de importar el Loader

interface Principal {
  id: string;         // El ID del principal, es un string
  name: string;       // El nombre del principal, un string
  short_name: string; // El nombre corto del principal, un string
}

export default function PrincipalsPage() {
  const { currentLang } = useLanguage(); // Obtiene el idioma actual desde el contexto
  const translations = useTranslations(currentLang); // Obtiene las traducciones según el idioma actual
  const [principals, setPrincipals] = useState<Principal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrincipals = async () => {
      const session = await getSession();

      if (!session || !session.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/principals', {
          headers: {
            Authorization: `Token ${session.accessToken}`, // Asegúrate de usar "Token"
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); // Captura el texto de error
          console.error("Error Response:", errorText); // Log del error
          throw new Error(`${translations.fetchError}: ${errorText}`); // Añade el mensaje de error traducido
        }

        const data = await response.json();
        setPrincipals(data); // Almacena los principals en el estado
      } catch (error) {
        console.error("Error fetching principals:", error); // Log del error
      } finally {
        setLoading(false);
      }
    };

    fetchPrincipals();
  }, [translations]); 

  return (
    <div className="m-20">
      <h2>{translations.principals}</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-10">
          <PrincipalsTable principals={principals} translations={translations} />
        </div>
      )}
    </div>
  );
}

