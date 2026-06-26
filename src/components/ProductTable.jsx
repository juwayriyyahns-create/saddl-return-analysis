import React, { useState, useMemo } from 'react';

const ProductTable = ({ products = [], selectedCountry = 'UAE' }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'returnCost', direction: 'desc' });
  const currency = selectedCountry === 'KSA' ? 'SAR' : 'AED';

  const sortedProducts = useMemo(() => {
    let sortableItems = [...products];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [products, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (columnKey) => {
    if (sortConfig?.key === columnKey) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return '-';
    return `${currency} ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="w-full overflow-x-auto bg-slate-900 border border-slate-700 rounded-xl shadow-sm">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="text-xs text-slate-400 uppercase bg-slate-800/80 border-b border-slate-700 select-none">
          <tr>
            <th 
              className="px-6 py-4 font-medium cursor-pointer hover:text-slate-200 hover:bg-slate-800 transition-colors"
              onClick={() => requestSort('title')}
            >
              Product Title{getSortIndicator('title')}
            </th>
            <th 
              className="px-6 py-4 font-medium cursor-pointer hover:text-slate-200 hover:bg-slate-800 transition-colors"
              onClick={() => requestSort('asin')}
            >
              ASIN{getSortIndicator('asin')}
            </th>
            <th 
              className="px-6 py-4 font-medium cursor-pointer hover:text-slate-200 hover:bg-slate-800 transition-colors"
              onClick={() => requestSort('msku')}
            >
              MSKU{getSortIndicator('msku')}
            </th>
            <th 
              className="px-6 py-4 font-medium cursor-pointer hover:text-slate-200 hover:bg-slate-800 transition-colors text-right"
              onClick={() => requestSort('returnQty')}
            >
              Return Qty{getSortIndicator('returnQty')}
            </th>
            <th 
              className="px-6 py-4 font-medium cursor-pointer hover:text-slate-200 hover:bg-slate-800 transition-colors text-right"
              onClick={() => requestSort('returnCost')}
            >
              Return Cost{getSortIndicator('returnCost')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {sortedProducts.map((product, idx) => (
            <tr 
              key={`${product.asin}-${product.msku}-${idx}`}
              className="hover:bg-slate-800/80 transition-colors even:bg-slate-900 odd:bg-slate-800/30"
            >
              <td className="px-6 py-4 font-medium text-slate-200 truncate max-w-xs" title={product.title}>
                {product.title}
              </td>
              <td className="px-6 py-4 font-mono text-slate-400">
                {product.asin}
              </td>
              <td className="px-6 py-4 font-mono text-slate-400">
                {product.msku}
              </td>
              <td className="px-6 py-4 text-right">
                {product.returnQty?.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right font-medium text-rose-400">
                {formatCurrency(product.returnCost)}
              </td>
            </tr>
          ))}
          {sortedProducts.length === 0 && (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                No products found for the selected criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
