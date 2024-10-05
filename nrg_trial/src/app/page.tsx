"use client";

import { useTranslations } from '../utils/i18n';
import { useLanguage } from './context/LanguageContext';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import styles from './styles/componentStyles/Home.module.scss';

export default function Home() {
  const { currentLang } = useLanguage();
  const translations = useTranslations(currentLang);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000); 
    if (translations && Object.keys(translations).length > 0) {
      setLoading(false);
    }
    return () => clearTimeout(timeout);
  }, [translations]);

  return (
    <main className="flex flex-col items-center justify-center flex-grow">
      <div className="flex flex-col items-center justify-center max-w-5xl mt-36 text-center">
        {loading ? (
          <Loader/>
        ) : (
          <>
            <h1>{translations?.welcome}</h1>
            <p className={`${styles.description} mt-2`}>{translations?.welcomeDescription}</p> 
          </>
         
        )}
      </div>
    </main>
  );
}




