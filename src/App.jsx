import React, { useState } from 'react';
import FilterBar from './components/FilterBar';
import KpiCards from './components/KpiCards';
import ProductTable from './components/ProductTable';
import ReasonChart from './components/ReasonChart';
import { useFetchReturns } from './hooks/useFetchReturns';

const App = () => {
  // Default date range: last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const [country, setCountry] = useState('UAE');
  const [dateRange, setDateRange] = useState({
    startDate: thirtyDaysAgo.toISOString(),
    endDate: new Date().toISOString()
  });

  // Fetch data using the custom hook
  const { returns, loading, error } = useFetchReturns();

  // Filter returns based on selected country and date range
  const filteredReturns = returns.filter((item) => {
    // Country Filter
    if (country !== 'All' && item.country !== country) {
      return false;
    }
    // Date Filter (assuming item.return_date is an ISO string)
    if (dateRange.startDate && new Date(item.return_date) < new Date(dateRange.startDate)) {
      return false;
    }
    if (dateRange.endDate && new Date(item.return_date) > new Date(dateRange.endDate)) {
      return false;
    }
    return true;
  });

  // Calculate KPIs
  const totalReturns = filteredReturns.length;
  const totalReturnCost = filteredReturns.reduce((sum, item) => sum + (Number(item.true_return_cost) || 0), 0);
  const avgReturnCost = totalReturns > 0 ? totalReturnCost / totalReturns : 0;
  
  // Calculate top reason
  const reasonCounts = {};
  filteredReturns.forEach(item => {
    if (item.reason_formatted) {
      reasonCounts[item.reason_formatted] = (reasonCounts[item.reason_formatted] || 0) + 1;
    }
  });
  
  let topReason = '-';
  let maxCount = 0;
  for (const [reason, count] of Object.entries(reasonCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topReason = reason;
    }
  }

  // Reason Chart Data (top 8)
  const reasonChartData = Object.entries(reasonCounts)
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Group by Product for the Table
  const productGroups = {};
  filteredReturns.forEach(item => {
    const key = `${item.asin}-${item.msku}`;
    if (!productGroups[key]) {
      productGroups[key] = {
        asin: item.asin,
        msku: item.msku,
        title: item.title,
        returnQty: 0,
        returnCost: 0
      };
    }
    // Assuming each row is 1 returned unit, or using item.quantity if available
    productGroups[key].returnQty += (item.quantity || 1);
    productGroups[key].returnCost += (Number(item.true_return_cost) || 0);
  });
  const productTableData = Object.values(productGroups);

  const kpis = {
    totalReturns,
    totalReturnCost,
    avgReturnCost,
    topReason,
    returnRate: 4.2 // Placeholder as we don't have total sales data
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Returns Dashboard</h1>
          <p className="text-slate-400">Analyze return trends and costs across regions.</p>
        </div>

        {/* Global Error/Loading States */}
        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}
        
        {loading && (
          <div className="text-slate-400 animate-pulse">Loading dashboard data...</div>
        )}

        {/* Main Dashboard Content */}
        {!loading && !error && (
          <>
            <FilterBar
              selectedCountry={country}
              onCountryChange={setCountry}
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onDateChange={setDateRange}
            />

            <KpiCards 
              kpis={kpis} 
              selectedCountry={country} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-slate-200 mb-4">Returned Products Analysis</h2>
                <ProductTable 
                  products={productTableData} 
                  selectedCountry={country} 
                />
              </div>
              <div className="lg:col-span-1">
                <ReasonChart data={reasonChartData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
