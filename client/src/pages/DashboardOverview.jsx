import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  FileText, Sparkles, TrendingUp, DollarSign, ShieldAlert, Clock, 
  ArrowUpRight, BarChart2, CheckCircle2, ChevronRight, PieChart, CheckSquare
} from 'lucide-react';
import RiskGauge from '../components/RiskGauge';

export default function DashboardOverview() {
  const { user, contracts, activeWorkspace } = useApp();

  // Calculate Key Enterprise Metrics
  const totalValue = contracts.reduce((acc, c) => acc + (c.value || 0), 0);
  const totalRevenue = contracts.reduce((acc, c) => acc + (c.expectedRevenue || 0), 0);
  const totalProfit = contracts.reduce((acc, c) => acc + (c.estimatedProfit || 0), 0);
  const avgMargin = contracts.length > 0
    ? (contracts.reduce((acc, c) => acc + (c.profitMargin || 0), 0) / contracts.length).toFixed(1)
    : 0;
  const highRiskCount = contracts.filter(c => c.riskScore > 50 || c.clauses?.some(cl => cl.riskLevel === 'High')).length;
  const upcomingRenewalsCount = contracts.filter(c => c.autoRenewal).length;
  const totalObligationsCount = contracts.reduce((acc, c) => acc + (c.obligations?.length || 0), 0);

  return (
    <div className="space-y-8">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {activeWorkspace}
            </span>
            <span className="text-xs text-slate-400 font-mono">Live Portfolio Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Executive Intelligence Command
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time legal risk detection, commercial P&L forecasting, and obligation monitoring.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/dashboard/ai-review"
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>AI Review Contract</span>
          </Link>
          <Link
            to="/dashboard/builder"
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>New Agreement</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards (8 Key Cards Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Active Contracts */}
        <div className="p-5 rounded-2xl glass-panel space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Contracts</span>
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
            {contracts.length}
          </div>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> 100% Parsed & Indexed
          </span>
        </div>

        {/* Metric 2: Portfolio Contract Value */}
        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Portfolio Contract Value</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
            ${(totalValue / 1000000).toFixed(2)}M
          </div>
          <span className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Total Committed Value
          </span>
        </div>

        {/* Metric 3: Projected Net Profit */}
        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Projected Net Profit</span>
            <TrendingUp className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
            ${(totalProfit / 1000).toFixed(0)}k
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Avg Profit Margin: <strong className="text-blue-500">{avgMargin}%</strong>
          </span>
        </div>

        {/* Metric 4: High Risk Contracts */}
        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">High Risk Contracts</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-rose-600 dark:text-rose-400">
            {highRiskCount}
          </div>
          <span className="text-[11px] text-rose-500 font-medium">
            {highRiskCount > 0 ? 'Requires Legal Action' : 'Zero High Risks'}
          </span>
        </div>

      </div>

      {/* Main Analytical Section: Revenue Trends & Risk Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Financial Revenue Trends Chart Simulation (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Commercial Cash Flow Forecast</h2>
              <p className="text-xs text-slate-500">Projected quarterly revenue vs operational expenses.</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              P&L Simulator Engine
            </span>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="h-48 pt-6 flex items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            {[
              { quarter: 'Q1 2026', rev: 980000, exp: 420000 },
              { quarter: 'Q2 2026', rev: 1250000, exp: 510000 },
              { quarter: 'Q3 2026', rev: 1420000, exp: 580000 },
              { quarter: 'Q4 2026', rev: 1680000, exp: 620000 },
            ].map((q, idx) => {
              const maxVal = 2000000;
              const revPct = (q.rev / maxVal) * 100;
              const expPct = (q.exp / maxVal) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-36">
                    <div 
                      style={{ height: `${revPct}%` }}
                      className="w-1/2 bg-blue-600 rounded-t-md transition-all group-hover:bg-blue-500"
                      title={`Revenue: $${q.rev.toLocaleString()}`}
                    ></div>
                    <div 
                      style={{ height: `${expPct}%` }}
                      className="w-1/2 bg-slate-300 dark:bg-slate-700 rounded-t-md transition-all"
                      title={`Expenses: $${q.exp.toLocaleString()}`}
                    ></div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">{q.quarter}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-600"></span> Expected Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-400 dark:bg-slate-700"></span> Operational Costs
              </span>
            </div>
            <Link to="/dashboard/bi-simulator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Simulate Deal Variables →
            </Link>
          </div>
        </div>

        {/* Right: Portfolio Risk Breakdown (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Legal Risk Distribution</h2>
            <span className="text-xs text-slate-500 font-mono">Portfolio Heatmap</span>
          </div>

          <div className="space-y-3">
            {contracts.map((c) => (
              <div key={c.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div className="space-y-0.5 truncate pr-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{c.title}</h4>
                  <p className="text-[10px] text-slate-500">{c.client} • Value: ${c.value?.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                    c.riskScore > 50 
                      ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' 
                      : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                  }`}>
                    Risk: {c.riskScore}/100
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Overall Portfolio Health Score</span>
            <span className="font-mono font-bold text-emerald-500">88/100 (Safe)</span>
          </div>
        </div>

      </div>

      {/* Recent High Priority Obligations & Quick Action Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pending Obligations */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4 text-blue-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Contract Obligations</h3>
            </div>
            <Link to="/dashboard/obligations" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
              View All ({totalObligationsCount})
            </Link>
          </div>

          <div className="space-y-2">
            {contracts.flatMap(c => c.obligations || []).slice(0, 3).map((ob, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{ob.task}</span>
                  <div className="text-[10px] text-slate-500">Owner: {ob.owner} • Due: {ob.dueDate}</div>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                  ob.priority === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {ob.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick App Shortcut Launcher */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Contract Intelligence Workspaces</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/dashboard/bi-simulator" className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 transition-colors group">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block group-hover:underline">P&L Deal Simulator</span>
              <span className="text-[10px] text-slate-500">Test discount & cash flow</span>
            </Link>

            <Link to="/dashboard/builder" className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/15 transition-colors group">
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 block group-hover:underline">AI Contract Builder</span>
              <span className="text-[10px] text-slate-500">Generate MSA, NDA & SOW</span>
            </Link>

            <Link to="/dashboard/negotiation" className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 transition-colors group">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block group-hover:underline">Negotiation Diff</span>
              <span className="text-[10px] text-slate-500">Compare V1 vs V2 clauses</span>
            </Link>

            <Link to="/dashboard/playbook" className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-colors group">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block group-hover:underline">Company Playbook</span>
              <span className="text-[10px] text-slate-500">Audit company policy rules</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
