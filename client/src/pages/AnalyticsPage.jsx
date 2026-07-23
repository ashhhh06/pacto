import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, TrendingUp, DollarSign, ShieldAlert, Clock, CheckSquare, 
  PieChart, Activity, Building2, Calendar
} from 'lucide-react';

export default function AnalyticsPage() {
  const { contracts } = useApp();

  const totalValue = contracts.reduce((a, c) => a + (c.value || 0), 0);
  const totalRevenue = contracts.reduce((a, c) => a + (c.expectedRevenue || 0), 0);
  const totalProfit = contracts.reduce((a, c) => a + (c.estimatedProfit || 0), 0);
  const avgMargin = contracts.length > 0 ? (contracts.reduce((a, c) => a + (c.profitMargin || 0), 0) / contracts.length).toFixed(1) : 0;

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Feature 11 Showcase • Executive Analytics Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Enterprise Portfolio Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Enterprise KPIs, commercial trends, department exposure, and risk distribution metrics.
          </p>
        </div>
      </div>

      {/* 8 Enterprise KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-panel space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">1. Active Contracts</span>
          <p className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">{contracts.length}</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">2. Total Contract Value</span>
          <p className="text-2xl font-extrabold font-mono text-emerald-500">${(totalValue / 1000000).toFixed(2)}M</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">3. Expected Revenue</span>
          <p className="text-2xl font-extrabold font-mono text-blue-500">${(totalRevenue / 1000000).toFixed(2)}M</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">4. Projected Net Profit</span>
          <p className="text-2xl font-extrabold font-mono text-cyan-500">${(totalProfit / 1000).toFixed(0)}k</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">5. Average Profit Margin</span>
          <p className="text-2xl font-extrabold font-mono text-purple-500">{avgMargin}%</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">6. High Risk Agreements</span>
          <p className="text-2xl font-extrabold font-mono text-rose-500">1</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">7. Upcoming Renewals</span>
          <p className="text-2xl font-extrabold font-mono text-amber-500">3</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">8. Pending Obligations</span>
          <p className="text-2xl font-extrabold font-mono text-blue-400">5</p>
        </div>
      </div>

      {/* Multi-Chart Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Department Distribution */}
        <div className="glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Department Contract Allocation</h3>
          <div className="space-y-3">
            {[
              { dept: 'Sales & Commercial', pct: 45, color: 'bg-blue-600' },
              { dept: 'Procurement & Engineering', pct: 25, color: 'bg-emerald-500' },
              { dept: 'Consulting Services', pct: 20, color: 'bg-cyan-500' },
              { dept: 'Business Development', pct: 10, color: 'bg-amber-500' }
            ].map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">{d.dept}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{d.pct}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${d.pct}%` }} className={`h-full ${d.color} rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Monthly Activity Velocity */}
        <div className="glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Monthly Contract Execution Velocity</h3>
          <div className="h-40 flex items-end justify-between gap-3 pt-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m, idx) => {
              const h = [40, 65, 50, 85, 70, 95, 80][idx];
              return (
                <div key={m} className="flex-1 flex flex-col items-center gap-2">
                  <div style={{ height: `${h}%` }} className="w-full bg-blue-600 rounded-t-md hover:bg-blue-500 transition-all"></div>
                  <span className="text-[10px] font-mono text-slate-400">{m}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
