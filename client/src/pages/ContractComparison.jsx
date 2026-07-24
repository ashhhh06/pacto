import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GitCompare, Sparkles, AlertTriangle, ArrowRight, ShieldAlert, 
  DollarSign, CheckCircle2, FileText, Edit3, RefreshCw
} from 'lucide-react';

export default function ContractComparison() {
  const { contracts, token } = useApp();
  const [selectedContractA, setSelectedContractA] = useState(contracts[0]?.id || '');
  const [selectedContractB, setSelectedContractB] = useState(contracts[1]?.id || contracts[0]?.id || '');
  
  const [textA, setTextA] = useState('Standard Master Services Agreement with 2x liability cap and Net 30 payment terms.');
  const [textB, setTextB] = useState('Revised Master Services Agreement with uncapped liability, perpetual IP license, and Net 60 payment terms.');

  const [comparisonResult, setComparisonResult] = useState(null);
  const [isComparing, setIsComparing] = useState(false);

  const runComparison = async () => {
    setIsComparing(true);
    try {
      const cA = contracts.find(c => c.id === selectedContractA);
      const cB = contracts.find(c => c.id === selectedContractB);

      const payloadA = cA?.contentText || textA;
      const payloadB = cB?.contentText || textB;

      const resp = await fetch('/api/contracts/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contractA: payloadA,
          contractB: payloadB,
          titleA: cA?.title || 'Version 1 (Baseline)',
          titleB: cB?.title || 'Version 2 (Revised)'
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        setComparisonResult(data);
      }
    } catch (err) {
      console.error('Comparison error:', err);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            <GitCompare className="w-3.5 h-3.5" />
            <span>Contract Version Comparison</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Contract Version Comparison & Diff
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Compare contract versions side-by-side to highlight clause changes, liability cap shifts, risk differences, and business impact summaries.
          </p>
        </div>

        <button
          onClick={runComparison}
          disabled={isComparing}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-2 self-start sm:self-auto"
        >
          <GitCompare className="w-4 h-4" />
          <span>{isComparing ? 'Comparing Versions...' : 'Run Version Comparison'}</span>
        </button>
      </div>

      {/* Contract Version Selectors */}
      <div className="glass-panel rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Select Agreements to Compare</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Version A */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Version A (Baseline Draft)</label>
            {contracts.length > 0 ? (
              <select
                value={selectedContractA}
                onChange={(e) => setSelectedContractA(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
              >
                {contracts.map(c => (
                  <option key={c.id} value={c.id}>{c.title} (Risk: {c.riskScore}/100)</option>
                ))}
              </select>
            ) : (
              <textarea
                value={textA}
                onChange={(e) => setTextA(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-mono"
              />
            )}
          </div>

          {/* Version B */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Version B (Revised Counter-Draft)</label>
            {contracts.length > 0 ? (
              <select
                value={selectedContractB}
                onChange={(e) => setSelectedContractB(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
              >
                {contracts.map(c => (
                  <option key={c.id} value={c.id}>{c.title} (Risk: {c.riskScore}/100)</option>
                ))}
              </select>
            ) : (
              <textarea
                value={textB}
                onChange={(e) => setTextB(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-mono"
              />
            )}
          </div>

        </div>
      </div>

      {/* Comparison Results Area */}
      {comparisonResult ? (
        <div className="space-y-6">
          
          {/* Executive Summary Card */}
          <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Version Comparison Summary</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {comparisonResult.summary}
            </p>
          </div>

          {/* Side-by-Side Highlighted Changes */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-500" />
              <span>Highlighted Clause & Risk Differences</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {comparisonResult.differences?.map((item, idx) => (
                <div key={idx} className="glass-panel rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{item.feature}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      item.changed ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {item.impact}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Version A</span>
                      <p className="text-slate-800 dark:text-slate-200">{item.versionA}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 space-y-1">
                      <span className="text-[10px] text-blue-500 font-bold uppercase block">Version B</span>
                      <p>{item.versionB}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xl">
          <GitCompare className="w-10 h-10 text-blue-500 mx-auto opacity-70" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Run Version Comparison</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Select two contract versions above and click "Run Version Comparison" to evaluate risk shifts, liability changes, and business impact.
          </p>
          <button
            onClick={runComparison}
            disabled={isComparing}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white shadow-md hover:bg-blue-700"
          >
            {isComparing ? 'Comparing...' : 'Compare Selected Versions'}
          </button>
        </div>
      )}

    </div>
  );
}
