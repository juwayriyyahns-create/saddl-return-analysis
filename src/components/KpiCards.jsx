import React from 'react';
import { 
  PackageMinus, 
  CircleDollarSign, 
  Receipt, 
  AlertCircle, 
  Percent 
} from 'lucide-react';

const KpiCards = ({ kpis = {}, selectedCountry }) => {
  const currency = selectedCountry === 'KSA' ? 'SAR' : 'AED';

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return '-';
    return `${currency} ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatNumber = (value) => {
    if (value === undefined || value === null) return '-';
    return value.toLocaleString();
  };

  const formatPercent = (value) => {
    if (value === undefined || value === null) return '-';
    return `${value}%`;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 w-full">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <PackageMinus className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Returns
          </h3>
        </div>
        <p className="text-2xl font-bold text-white">
          {formatNumber(kpis.totalReturns)}
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <CircleDollarSign className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Cost
          </h3>
        </div>
        <p className="text-2xl font-bold text-white">
          {formatCurrency(kpis.totalReturnCost)}
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Receipt className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Avg Cost
          </h3>
        </div>
        <p className="text-2xl font-bold text-white">
          {formatCurrency(kpis.avgReturnCost)}
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Top Reason
          </h3>
        </div>
        <p className="text-lg font-bold text-white truncate" title={kpis.topReason || '-'}>
          {kpis.topReason || '-'}
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Percent className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Return Rate
          </h3>
        </div>
        <p className="text-2xl font-bold text-white">
          {formatPercent(kpis.returnRate)}
        </p>
      </div>
    </div>
  );
};

export default KpiCards;
