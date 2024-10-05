// export default DealsFilters;
import React from 'react';

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
  volume_min: string;      // Añadido
  volume_max: string;      // Añadido
  fixed_price_min: string; // Añadido
  fixed_price_max: string; // Añadido
}

interface DealsFiltersProps {
  filters: Filters;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  translations: Record<string, string>; 
}

const DealsFilters: React.FC<DealsFiltersProps> = ({ filters, onFilterChange, translations }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-2">{translations.filters}</h3>
      
      {/* Primera fila: Code, Status, Proposed To, Sense */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          name="code"
          value={filters.code}
          onChange={onFilterChange}
          placeholder={translations.code}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        />
        <select
          name="status"
          value={filters.status}
          onChange={onFilterChange}
          className="border border-gray-300 rounded px-2 py-1 w-full"
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
          className="border border-gray-300 rounded px-2 py-1 w-full"
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
          className="border border-gray-300 rounded px-2 py-1 w-full"
        >
          <option value="">{translations.sense}</option>
          <option value="1">{translations.buy}</option>
          <option value="2">{translations.sell}</option>
        </select>
      </div>

      {/* Segunda fila: Volume y Fixed Price */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="mr-2">{translations.volume}:</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="volume_min"
              value={filters.volume_min}
              onChange={onFilterChange}
              placeholder={translations.min}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
            <input
              type="number"
              name="volume_max"
              value={filters.volume_max}
              onChange={onFilterChange}
              placeholder={translations.max}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
        </div>
        <div>
          <label className="mr-2">{translations.fixed_price}:</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="fixed_price_min"
              value={filters.fixed_price_min}
              onChange={onFilterChange}
              placeholder={translations.min}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
            <input
              type="number"
              name="fixed_price_max"
              value={filters.fixed_price_max}
              onChange={onFilterChange}
              placeholder={translations.max}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
        </div>
      </div>

      {/* Tercera fila: Trade Date, Creation, Update */}
      <div className="mt-4">
        <h3 className="mb-2">{translations.date_filters}</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="mr-2">{translations.trade_date}:</label>
            <div className="flex space-x-2">
              <input
                type="date"
                name="trade_date_start"
                value={filters.trade_date_start}
                onChange={onFilterChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
              <input
                type="date"
                name="trade_date_end"
                value={filters.trade_date_end}
                onChange={onFilterChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
          </div>
          <div>
            <label className="mr-2">{translations.creation}:</label>
            <div className="flex space-x-2">
              <input
                type="date"
                name="created_at_start"
                value={filters.created_at_start}
                onChange={onFilterChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
              <input
                type="date"
                name="created_at_end"
                value={filters.created_at_end}
                onChange={onFilterChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
          </div>
          <div>
            <label className="mr-2">{translations.update}:</label>
            <div className="flex space-x-2">
              <input
                type="date"
                name="updated_at_start"
                value={filters.updated_at_start}
                onChange={onFilterChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
              <input
                type="date"
                name="updated_at_end"
                value={filters.updated_at_end}
                onChange={onFilterChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsFilters;
