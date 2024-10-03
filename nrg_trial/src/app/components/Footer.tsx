"use client"; // Asegúrate de que este archivo sea un componente de cliente

import React from 'react';
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones

const Footer = () => {
  const { currentLang } = useLanguage(); // Obtiene el idioma actual desde el contexto
  const translations = useTranslations(currentLang); // Obtiene las traducciones según el idioma actual

  return (
    <footer className="bg-gray-500 p-4 text-center text-white mt-auto">
      <h1>{translations.footer}</h1> {/* Traducción para el pie de página */}
    </footer>
  );
};

export default Footer;
