import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Download, Printer, Sparkles, FileText, CheckCircle2, 
  ShieldAlert, DollarSign, BarChart3
} from 'lucide-react';

export default function ReportsPage() {
  const { user, contracts, activeWorkspace } = useApp();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 400);
  };

  const totalValue = contracts.reduce((a, c) => a + (c.value || 0), 0);
  const totalRevenue = contracts.reduce((a, c) => a + (c.expectedRevenue || Math.round((c.value || 0) * 0.9)), 0);
  const totalProfit = contracts.reduce((a, c) => a + (c.estimatedProfit || Math.round((c.value || 0) * 0.35)), 0);
  const avgMargin = contracts.length > 0
    ? (contracts.reduce((a, c) => a + (c.profitMargin || 35.5), 0) / contracts.length).toFixed(1)
    : 35.5;

  const highRiskContracts = contracts.filter(c => (c.riskScore || 0) > 50);

  return (
    <div className="space-y-8 max-w-4xl mx-auto print:max-w-none print:p-0">
      
      {/* Top Controls (Hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 print:hidden">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Download className="w-3.5 h-3.5" />
            <span>Executive Board Reporting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Executive Summary Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Printable and exportable executive summary summarizing financial value, net margins, risk factors, and active obligations.
          </p>
        </div>

        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-2 self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>{isExporting ? 'Preparing Report...' : 'Print / Export Executive Summary'}</span>
        </button>
      </div>

      {/* Formatted Report Document Canvas */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-8 shadow-2xl print:shadow-none print:border-none print:p-0">
        
        {/* Report Header Banner */}
        <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Pacto<span className="text-blue-600">.ai</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">Executive Intelligence</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
              Contract Portfolio Executive Summary Report
            </h2>
            <p className="text-xs text-slate-500">Organization: {user?.organizationName || activeWorkspace} • Generated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="text-right space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
              BOARD APPROVED
            </span>
            <p className="text-[10px] text-slate-400">Confidential Document</p>
          </div>
        </div>

        {/* Section 1: Financial Overview */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            1. Financial Overview & Profitability
          </h3>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Committed Value</span>
              <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">${totalValue.toLocaleString()}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Projected Net Profit</span>
              <p className="text-lg font-bold font-mono text-emerald-500">${totalProfit.toLocaleString()}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Average Net Margin</span>
              <p className="text-lg font-bold font-mono text-cyan-500">{avgMargin}%</p>
            </div>
          </div>
        </div>

        {/* Section 2: Legal Risk Analysis */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            2. Legal Risk Assessment
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The active organization portfolio consists of <strong>{contracts.length} agreements</strong>. 
            {highRiskContracts.length > 0 ? (
              ` ${highRiskContracts.length} contract(s) have been flagged for high liability risk exposure and require legal review.`
            ) : (
              ` Zero high risk items detected across all active agreements.`
            )}
          </p>
        </div>

        {/* Section 3: Active Contracts List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            3. Portfolio Contract Inventory
          </h3>
          <div className="space-y-2 text-xs">
            {contracts.map(c => (
              <div key={c.id || c._id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{c.title}</span>
                  <span className="text-[11px] text-slate-500 block">Owner: {c.owner} • Client: {c.client}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-slate-900 dark:text-white">${c.value?.toLocaleString()}</span>
                  <span className={`block text-[10px] font-semibold ${c.riskScore > 50 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    Risk: {c.riskScore}/100 ({c.status})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: AI Strategic Executive Recommendation */}
        <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-blue-600 dark:text-blue-400">Pacto Executive Recommendation</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            "Maintain current Net 30 payment schedules and enforce standard 2x liability caps on upcoming renewal agreements to preserve portfolio profitability and minimize cash flow latency."
          </p>
        </div>

      </div>

    </div>
  );
}
