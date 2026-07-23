import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Download, Printer, Sparkles, FileText, CheckCircle2, 
  ShieldAlert, DollarSign, BarChart3
} from 'lucide-react';

export default function ReportsPage() {
  const { contracts, activeWorkspace } = useApp();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 600);
  };

  const totalValue = contracts.reduce((a, c) => a + (c.value || 0), 0);
  const totalProfit = contracts.reduce((a, c) => a + (c.estimatedProfit || 0), 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto print:max-w-none print:p-0">
      
      {/* Top Controls (Hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 print:hidden">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Download className="w-3.5 h-3.5" />
            <span>Feature 12 Showcase • Executive Reports Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Executive Board Deck Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Generate printable, exportable reports including Financial Summaries, Risk Analysis, Compliance Status, and Business Insights.
          </p>
        </div>

        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-2 self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>{isExporting ? 'Preparing Report...' : 'Print / Export PDF Report'}</span>
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
              Q3 Contract Portfolio Executive Summary
            </h2>
            <p className="text-xs text-slate-500">Workspace: {activeWorkspace} • Date: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="text-right space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
              BOARD READY
            </span>
            <p className="text-[10px] text-slate-400">Strictly Confidential</p>
          </div>
        </div>

        {/* Section 1: Financial Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            1. Financial Summary & Profitability
          </h3>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border space-y-1">
              <span className="text-[10px] text-slate-400">Total Portfolio Value</span>
              <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">${totalValue.toLocaleString()}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border space-y-1">
              <span className="text-[10px] text-slate-400">Projected Net Profit</span>
              <p className="text-lg font-bold font-mono text-emerald-500">${totalProfit.toLocaleString()}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border space-y-1">
              <span className="text-[10px] text-slate-400">Average Profit Margin</span>
              <p className="text-lg font-bold font-mono text-cyan-500">35.8%</p>
            </div>
          </div>
        </div>

        {/* Section 2: Legal Risk Analysis */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            2. Legal Risk Analysis
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The active contract portfolio maintains a healthy <strong>88/100 safety index</strong>. 
            One agreement (CloudScale Systems) has been flagged for uncapped liability exposure and requires legal remediation before renewal.
          </p>
        </div>

        {/* Section 3: Compliance & Playbook Status */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            3. Playbook Compliance Status
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border">
              <span>Mandatory Mutual NDA Coverage</span>
              <span className="font-bold text-emerald-500">100% Compliant</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border">
              <span>Net 45 Maximum Payment Terms</span>
              <span className="font-bold text-emerald-500">100% Compliant</span>
            </div>
          </div>
        </div>

        {/* Section 4: AI Strategic Business Insights */}
        <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-blue-600 dark:text-blue-400">Pacto Executive Recommendation</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            "Prioritize CloudScale vendor renegotiation to cap liability at 1x annual spend. Commercial P&L simulation indicates that converting Net 30 payment schedules to Net 15 with a 1.5% discount would increase net annual cash flow by $140,000."
          </p>
        </div>

      </div>

    </div>
  );
}
