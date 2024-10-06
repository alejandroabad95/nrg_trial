"use client";
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import PrincipalsTable from '../components/PrincipalsTable'; 
import { useLanguage } from '../context/LanguageContext'; 
import { useTranslations } from '../../utils/i18n'; 
import Loader from '../components/Loader'; 

interface Principal {
  id: string;         
  name: string;       
  short_name: string; 
}

export default function PrincipalsPage() {
  const { currentLang } = useLanguage(); 
  const translations = useTranslations(currentLang);
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
            Authorization: `Token ${session.accessToken}`, 
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); 
          console.error("Error Response:", errorText); 
          throw new Error(`${translations.fetchError}: ${errorText}`); 
        }

        const data = await response.json();
        setPrincipals(data); 
      } catch (error) {
        console.error("Error fetching principals:", error); 
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

