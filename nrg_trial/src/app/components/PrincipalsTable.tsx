// components/PrincipalsTable.tsx
import React from 'react';
import PrincipalsRow from './PrincipalsRow';
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje

interface Principal {
  id: string;
  name: string;
  short_name: string;
}

interface PrincipalsTableProps {
  principals: Principal[];
}

const PrincipalsTable: React.FC<PrincipalsTableProps> = ({ principals }) => {
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones

  return (
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-300">
          <th className="p-2 text-left">ID</th> {/* Sin traducción */}
          <th className="p-2 text-left">{translations.name}</th> {/* Traducción para Nombre */}
          <th className="p-2 text-left">{translations.shortName}</th> {/* Traducción para Nombre Corto */}
        </tr>
      </thead>
      <tbody>
        {principals.map((principal) => (
          <PrincipalsRow key={principal.id} principal={principal} />
        ))}
      </tbody>
    </table>
  );
};

export default PrincipalsTable;
