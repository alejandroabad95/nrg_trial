// app/components/DealsFilters.tsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones

interface Filters {
  code: string;
  status: string;
  proposed_to: string;
  sense: string;
  trade_date_start: string;
  trade_date_end: string;
  created_at_start: string;
  created_at_end: string;
  updated_at_start: string;
  updated_at_end: string;
}

interface DealsFiltersProps {
  filters: Filters;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const DealsFilters: React.FC<DealsFiltersProps> = ({ filters, onFilterChange }) => {
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones

  return (
    <div className="mb-4">
      <h2>{translations.filters}</h2>
      <input
        type="text"
        name="code"
        value={filters.code}
        onChange={onFilterChange}
        placeholder={translations.code}
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      />
      <select
        name="status"
        value={filters.status}
        onChange={onFilterChange}
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      >
        <option value="">{translations.status}</option>
        <option value="0">{translations.inactive}</option>
        <option value="1">{translations.unverified}</option>
        <option value="2">{translations.verified}</option>
      </select>
      <select
        name="proposed_to"
        value={filters.proposed_to}
        onChange={onFilterChange}
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      >
        <option value="">{translations.proposed_to}</option>
        <option value="0">{translations.none}</option>
        <option value="1">{translations.amendment}</option>
        <option value="2">{translations.deleted}</option>
      </select>
      <select
        name="sense"
        value={filters.sense}
        onChange={onFilterChange}
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      >
        <option value="">{translations.sense}</option>
        <option value="1">{translations.buy}</option>
        <option value="2">{translations.sell}</option>
      </select>

      {/* Filtros de Fechas */}
      <div className="mt-4">
        <h3>{translations.date_filters}</h3>
        <div>
          <label className="mr-2">{translations.trade_date}:</label>
          <input
            type="date"
            name="trade_date_start"
            value={filters.trade_date_start}
            onChange={onFilterChange}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="date"
            name="trade_date_end"
            value={filters.trade_date_end}
            onChange={onFilterChange}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
        </div>
        <div className="mt-2">
          <label className="mr-2">{translations.creation}:</label>
          <input
            type="date"
            name="created_at_start"
            value={filters.created_at_start}
            onChange={onFilterChange}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="date"
            name="created_at_end"
            value={filters.created_at_end}
            onChange={onFilterChange}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
        </div>
        <div className="mt-2">
          <label className="mr-2">{translations.update}:</label>
          <input
            type="date"
            name="updated_at_start"
            value={filters.updated_at_start}
            onChange={onFilterChange}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="date"
            name="updated_at_end"
            value={filters.updated_at_end}
            onChange={onFilterChange}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
        </div>
      </div>
    </div>
  );
};

export default DealsFilters;
