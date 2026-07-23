import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Clock, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, 
  Calendar, ShieldAlert, DollarSign, ArrowRight
} from 'lucide-react';

export default function RenewalIntelligence() {
  const { contracts } = useApp();

  const renewalContracts = contracts.filter(c => c.renewalDate || c.autoRenewal);
  const totalARRAtRisk = contracts.reduce((acc, c) => acc + (c.annualValue || 0), 0);

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Feature 9 Showcase • Auto-Renewal & Notice Period Radar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Renewal Intelligence & ARR Radar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Automatically detect renewal dates, notice windows, auto-renewal traps, and forecast recurring revenue.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Upcoming Renewals (Next 12 Months)</span>
          <p className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">{renewalContracts.length} Agreements</p>
          <span className="text-[10px] text-blue-500 font-semibold">100% Notice Windows Mapped</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Annual Recurring Revenue (ARR)</span>
          <p className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            ${(totalARRAtRisk / 1000).toFixed(0)}k ARR
          </p>
          <span className="text-[10px] text-emerald-500 font-semibold">Forecasted Renewal Uplift: +12%</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel bg-slate-900 text-white space-y-1">
          <span className="text-xs font-semibold text-slate-400">Critical Cancellation Alert</span>
          <p className="text-2xl font-extrabold font-mono text-amber-400">
            1 Vendor Lock-In Flag
          </p>
          <span className="text-[10px] text-amber-400 font-semibold">CloudScale 120-Day Notice Window</span>
        </div>
      </div>

      {/* Renewal Timeline Radar Table */}
      <div className="glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Contract Renewal Radar Schedule</h3>

        <div className="space-y-3">
          {renewalContracts.map((c) => (
            <div key={c.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{c.title}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    c.autoRenewal ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {c.autoRenewal ? 'Auto-Renewal Enabled' : 'Fixed Term'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Client: {c.client} • ARR: ${c.annualValue?.toLocaleString()} • Expiry: {c.expiryDate}
                </p>
              </div>

              <div className="flex items-center space-x-6 text-xs">
                <div className="space-y-0.5 text-right font-mono">
                  <span className="text-[10px] text-slate-400 block uppercase">Notice Deadline</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{c.renewalDate} ({c.noticePeriodDays} Days)</span>
                </div>

                <button
                  onClick={() => alert(`Set reminder alert for ${c.title} renewal notice date: ${c.renewalDate}`)}
                  className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
                >
                  Set Opt-Out Alert
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
