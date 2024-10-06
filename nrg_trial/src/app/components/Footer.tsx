"use client"; 
import React from 'react';
import { useLanguage } from '../context/LanguageContext'; 
import { useTranslations } from '../../utils/i18n'; 


const Footer = () => {
  const { currentLang } = useLanguage(); 
  const translations = useTranslations(currentLang); 

  return (
    <footer className='p-auto text-center'>
      <h6 className='p-4'>{translations.footer}</h6> 
    </footer>
  );
};

export default Footer;
