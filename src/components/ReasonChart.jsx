import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ReasonChart = ({ data = [] }) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-200 mb-6">Return Reasons</h3>
      
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#334155" />
            
            <XAxis 
              type="number" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            
            <YAxis 
              dataKey="reason" 
              type="category" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              width={140}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                borderColor: '#334155',
                color: '#f8fafc',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              itemStyle={{ color: '#f8fafc', fontWeight: 600 }}
              cursor={{ fill: '#334155', opacity: 0.4 }}
              formatter={(value) => [value, 'Count']}
            />
            
            <Bar 
              dataKey="count" 
              fill="#E74C3C" 
              radius={[0, 4, 4, 0]}
              barSize={24} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReasonChart;
