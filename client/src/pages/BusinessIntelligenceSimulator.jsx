import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  SlidersHorizontal, DollarSign, TrendingUp, Sparkles, AlertTriangle, 
  CheckCircle2, ArrowRight, ShieldAlert, BarChart2, Calculator, Info, RefreshCw
} from 'lucide-react';

export default function BusinessIntelligenceSimulator() {
  const { contracts } = useApp();
  const [selectedContractId, setSelectedContractId] = useState(contracts[0]?.id || null);

  const selectedContract = contracts.find(c => c.id === selectedContractId) || contracts[0];

  // User-provided Business Inputs
  const [baseValue, setBaseValue] = useState(selectedContract?.value || 1200000);
  const [discountPercent, setDiscountPercent] = useState(10);
  const [paymentTermsDays, setPaymentTermsDays] = useState(30);
  const [infraCost, setInfraCost] = useState(350000);
  const [supportCost, setSupportCost] = useState(150000);

  // Recalculations Engine (Driven by user inputs)
  const calculatedGrossRevenue = Math.round(baseValue * (1 - discountPercent / 100));
  const totalOperationalCost = Number(infraCost) + Number(supportCost);
  const netProfit = calculatedGrossRevenue - totalOperationalCost;
  const netMargin = calculatedGrossRevenue > 0 ? ((netProfit / calculatedGrossRevenue) * 100).toFixed(1) : '0.0';
  const roiPercent = totalOperationalCost > 0 ? ((netProfit / totalOperationalCost) * 100).toFixed(1) : '0.0';

  // Payment Risk & Commercial Approval Decision
  const paymentRiskScore = paymentTermsDays === 15 ? 10 : paymentTermsDays === 30 ? 20 : paymentTermsDays === 60 ? 55 : 85;
  const isCommerciallyApproved = netProfit > 0 && Number(netMargin) >= 20 && paymentRiskScore < 60;

  const handleContractSelect = (id) => {
    setSelectedContractId(id);
    const c = contracts.find(item => item.id === id);
    if (c) {
      setBaseValue(c.value || 1000000);
      setDiscountPercent(10);
      setPaymentTermsDays(30);
      setInfraCost(Math.round((c.value || 1000000) * 0.3));
      setSupportCost(Math.round((c.value || 1000000) * 0.1));
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Commercial Business Impact Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Business Intelligence & P&L Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Model business inputs (contract value, discounts, operational spend) to evaluate net profit margin, ROI, and cash flow timeline.
          </p>
        </div>

        {/* Contract Selector */}
        {contracts.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500">Selected Agreement:</span>
            <select
              value={selectedContractId || contracts[0]?.id}
              onChange={(e) => handleContractSelect(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {contracts.map(c => (
                <option key={c.id} value={c.id}>{c.title} (${c.value?.toLocaleString()})</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: User Business Input Controls (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">User Business Inputs</h3>
            </div>
            <button
              onClick={() => {
                setDiscountPercent(10);
                setPaymentTermsDays(30);
                setInfraCost(350000);
                setSupportCost(150000);
              }}
              className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset Defaults
            </button>
          </div>

          {/* Input 1: Base Contract Value */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Base Contract Value ($)</span>
              <span className="font-mono font-bold text-blue-600">${baseValue.toLocaleString()}</span>
            </div>
            <input
              type="number"
              value={baseValue}
              onChange={(e) => setBaseValue(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Input 2: Proposed Discount Percent */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Proposed Discount (%)</span>
              <span className="font-mono font-bold text-amber-500">{discountPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0% (Full Price)</span>
              <span>15% (Standard Max)</span>
              <span>40% (Extreme)</span>
            </div>
          </div>

          {/* Input 3: Payment Schedule Window (Days) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Payment Schedule Window</span>
              <span className="font-mono font-bold text-blue-600">Net {paymentTermsDays} Days</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 60, 90].map(days => (
                <button
                  key={days}
                  onClick={() => setPaymentTermsDays(days)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    paymentTermsDays === days
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Net {days}
                </button>
              ))}
            </div>
          </div>

          {/* Input 4: Operational Spend & Support Expenses */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500">Cloud / Infra Spend ($)</label>
              <input
                type="number"
                value={infraCost}
                onChange={(e) => setInfraCost(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500">Support / Ops Cost ($)</label>
              <input
                type="number"
                value={supportCost}
                onChange={(e) => setSupportCost(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Live Recalculated P&L Output (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Output Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
              <span className="text-xs font-semibold text-slate-500">Calculated Gross Revenue</span>
              <p className="text-2xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
                ${calculatedGrossRevenue.toLocaleString()}
              </p>
              <span className="text-[10px] text-slate-400 font-mono">
                Discount Concession: -${(baseValue - calculatedGrossRevenue).toLocaleString()}
              </span>
            </div>

            <div className={`p-5 rounded-2xl border space-y-1 ${
              netProfit > 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'
            }`}>
              <span className="text-xs font-semibold text-slate-500">Projected Net Profit</span>
              <p className={`text-2xl font-extrabold font-mono ${
                netProfit > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}>
                ${netProfit.toLocaleString()}
              </p>
              <span className="text-[10px] text-slate-400 font-mono">Total Spend: ${totalOperationalCost.toLocaleString()}</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-1">
              <span className="text-xs font-semibold text-slate-400">Net Profit Margin</span>
              <p className="text-2xl font-extrabold font-mono text-cyan-400">
                {netMargin}%
              </p>
              <span className="text-[10px] text-slate-400 font-mono">Projected ROI: {roiPercent}%</span>
            </div>

          </div>

          {/* Business Impact Verdict Card */}
          <div className={`p-6 rounded-2xl border space-y-3 ${
            isCommerciallyApproved
              ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-900 dark:text-slate-100'
              : 'bg-amber-500/10 border-amber-500/30 text-slate-900 dark:text-slate-100'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <h4 className="text-sm font-extrabold">Commercial Profitability Assessment</h4>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                isCommerciallyApproved
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-amber-500 text-slate-950 border-amber-400'
              }`}>
                {isCommerciallyApproved ? 'COMMERCIALLY VIABLE' : 'NEEDS RE-NEGOTIATION'}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {isCommerciallyApproved ? (
                <>
                  Based on your inputs, this agreement yields a healthy <strong>{netMargin}% net profit margin</strong> (${netProfit.toLocaleString()} net profit) with manageable Net {paymentTermsDays} cash collection timing.
                </>
              ) : (
                <>
                  WARNING: The proposed {discountPercent}% discount combined with Net {paymentTermsDays} payment terms lowers the net profit margin to <strong>{netMargin}%</strong>. Consider capping discount at 10% or requesting Net 30 payment terms.
                </>
              )}
            </p>
          </div>

          {/* Quarterly Cash Flow Timeline */}
          <div className="glass-panel rounded-2xl p-6 space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Calculated Quarterly Cash Flow Breakdown
            </h4>
            <div className="space-y-3">
              {[
                { period: 'Quarter 1', rev: calculatedGrossRevenue * 0.25, cost: totalOperationalCost * 0.25 },
                { period: 'Quarter 2', rev: calculatedGrossRevenue * 0.25, cost: totalOperationalCost * 0.25 },
                { period: 'Quarter 3', rev: calculatedGrossRevenue * 0.25, cost: totalOperationalCost * 0.25 },
                { period: 'Quarter 4', rev: calculatedGrossRevenue * 0.25, cost: totalOperationalCost * 0.25 }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{item.period}</span>
                  <div className="flex items-center space-x-4 font-mono">
                    <span className="text-emerald-500 font-semibold">+${item.rev.toLocaleString()}</span>
                    <span className="text-slate-400">-${item.cost.toLocaleString()}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">= +${(item.rev - item.cost).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
