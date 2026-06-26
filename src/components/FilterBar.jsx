import React from 'react';

const FilterBar = ({
  selectedCountry = 'UAE',
  onCountryChange,
  startDate,
  endDate,
  onDateChange,
}) => {
  const formatDateForInput = (isoString) => {
    if (!isoString) return '';
    return isoString.split('T')[0];
  };

  const handleStartDateChange = (e) => {
    onDateChange({
      startDate: e.target.value ? new Date(e.target.value).toISOString() : '',
      endDate,
    });
  };

  const handleEndDateChange = (e) => {
    onDateChange({
      startDate,
      endDate: e.target.value ? new Date(e.target.value).toISOString() : '',
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-end gap-6 p-4 bg-slate-900 border border-slate-700 rounded-xl shadow-sm">
      <div className="flex flex-col gap-1.5 w-full sm:w-auto">
        <label htmlFor="country-filter" className="text-sm font-semibold text-slate-400">
          Country
        </label>
        <select
          id="country-filter"
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors cursor-pointer"
        >
          <option value="All">All</option>
          <option value="UAE">UAE</option>
          <option value="KSA">KSA</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 w-full sm:w-auto">
        <label className="text-sm font-semibold text-slate-400">
          Date Range (Last 30 Days Default)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={formatDateForInput(startDate)}
            onChange={handleStartDateChange}
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors [color-scheme:dark]"
          />
          <span className="text-slate-500 font-medium">to</span>
          <input
            type="date"
            value={formatDateForInput(endDate)}
            onChange={handleEndDateChange}
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors [color-scheme:dark]"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
