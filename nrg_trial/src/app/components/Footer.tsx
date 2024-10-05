"use client"; // Asegúrate de que este archivo sea un componente de cliente

import React from 'react';
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones


const Footer = () => {
  const { currentLang } = useLanguage(); // Obtiene el idioma actual desde el contexto
  const translations = useTranslations(currentLang); // Obtiene las traducciones según el idioma actual

  return (
    <footer className='p-auto text-center'>
      <h6 className='p-4'>{translations.footer}</h6> 
    </footer>
  );
};

export default Footer;
