import { useEffect, useState } from 'react';

type Language = 'en' | 'es';

export async function getTranslation(lang: Language) {
  switch (lang) {
    case 'es':
      return (await import('../locales/es/translation.json')).default;
    case 'en':
    default:
      return (await import('../locales/en/translation.json')).default;
  }
}

export function useTranslations(lang: Language) {
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadTranslations = async () => {
      const translation = await getTranslation(lang);
      setTranslations(translation);
    };

    loadTranslations();
  }, [lang]); // El efecto depende del idioma

  return translations;
}

