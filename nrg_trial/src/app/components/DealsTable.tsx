// components/DealsTable.tsx
import React from 'react';
import DealsRow from './DealsRow';
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones

interface Deal {
  id: string;
  code: string;
  trade_date: string;
  status: number;
  proposed_to: number;
  sense: number;
  volume: number;
  fixed_price: number;
}

interface DealsTableProps {
  deals: Deal[];
}

const DealsTable: React.FC<DealsTableProps> = ({ deals }) => {
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">ID</th> {/* ID */}
          <th className="p-2">{translations.code}</th> {/* Código */}
          <th className="p-2">{translations.trade_date}</th> {/* Fecha de Comercio */}
          <th className="p-2">{translations.status}</th> {/* Estado */}
          <th className="p-2">{translations.proposed_to}</th> {/* Propuesto a */}
          <th className="p-2">{translations.sense}</th> {/* Sentido */}
          <th className="p-2">{translations.volume}</th> {/* Volumen */}
          <th className="p-2">{translations.fixed_price}</th> {/* Precio Fijo */}
        </tr>
      </thead>
      <tbody>
        {deals.map(deal => (
          <DealsRow key={deal.id} deal={deal} />
        ))}
      </tbody>
    </table>
  );
};

export default DealsTable;
