import React from 'react';
import CounterpartiesRow from './CounterpartiesRow';
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje

interface Counterparty {
  id: number;
  name: string;
  type: number;
}

interface CounterpartiesTableProps {
  counterparties: Counterparty[];
}

const CounterpartiesTable: React.FC<CounterpartiesTableProps> = ({ counterparties }) => {
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones

  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="p-2 text-left">ID</th> {/* Sin traducción */}
          <th className="p-2 text-left">{translations.name}</th> {/* Traducción para Nombre */}
          <th className="p-2 text-left">{translations.type}</th> {/* Traducción para Tipo */}
        </tr>
      </thead>
      <tbody>
        {counterparties.map(counterparty => (
          <CounterpartiesRow key={counterparty.id} counterparty={counterparty} />
        ))}
      </tbody>
    </table>
  );
};

export default CounterpartiesTable;
