"use client"; // Esto marca el archivo como un Client Component

import { useTranslations } from '../utils/i18n'; // Asegúrate de que este hook esté definido
import { useLanguage } from './context/LanguageContext'; // Usa el hook que maneja el contexto

export default function Home() {
  const { currentLang } = useLanguage(); // Obtén el idioma actual desde el hook
  const translations = useTranslations(currentLang); // Obtén las traducciones según el idioma actual

  return (
    <main className="flex flex-col items-center justify-center flex-grow">
      <div className="w-full max-w-4xl mx-auto mt-20 text-center">
        <h1 className="text-4xl font-bold mb-4">{translations.welcome || 'Loading...'}</h1>
        <p className="text-lg text-center mt-20">{translations.welcomeDescription || 'Loading...'}</p>
      </div>
    </main>
  );
}

