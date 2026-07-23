import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GitCompare, Sparkles, AlertTriangle, ArrowRight, ShieldAlert, 
  DollarSign, CheckCircle2, Copy, FileText, Check, Plus, Minus, Edit3
} from 'lucide-react';

export default function ContractComparison() {
  const { contracts } = useApp();
  const [versionA, setVersionA] = useState('v1');
  const [versionB, setVersionB] = useState('v2');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Sample Version Differences Data for Acme Master Services Agreement
  const DIFF_SUMMARY = {
    addedClauses: [
      { name: 'Cybersecurity Data Breach Indemnity', impact: 'Adds $1M insurance coverage requirement for cloud incidents.' }
    ],
    removedClauses: [
      { name: 'Early Payment Discount (2%)', impact: 'Client removed the 2% discount incentive for payment within 15 days.' }
    ],
    modifiedClauses: [
      {
        name: 'Limitation of Liability Cap',
        oldText: 'Aggregate direct liability is capped at 2x annual contract fees paid.',
        newText: 'Aggregate direct liability is capped at 5x annual contract fees paid.',
        changeExplanation: 'Client increased liability cap from 2x to 5x ($2.9M to $7.25M).',
        whoBenefits: 'Client Benefits Significantly',
        businessImpact: 'High Financial Exposure Risk. Exceeds standard company playbook cap limit of 2x.'
      },
      {
        name: 'Payment Schedule Terms',
        oldText: 'Invoices due within 30 days of receipt.',
        newText: 'Invoices due within 60 days of receipt.',
        changeExplanation: 'Client extended payment window from Net 30 to Net 60 days.',
        whoBenefits: 'Client Benefits',
        businessImpact: 'Negative Cash Flow Impact. Creates a 30-day cash collection delay.'
      }
    ],
    financialVariance: {
      contractValueA: 1450000,
      contractValueB: 1450000,
      netMarginA: 35.8,
      netMarginB: 31.2,
      varianceNote: 'Net margin dropped by 4.6% due to extended payment terms and cash holding costs.'
    },
    suggestedResponseDraft: `
Dear Acme Legal Team,

Thank you for returning Version 2 of the Master Services Agreement. After review through our Pacto Contract Intelligence Platform, we have two key commercial and legal counter-proposals:

1. Limitation of Liability (Clause 14): Our company policy caps direct liability at 2x annual fees ($2.9M). We cannot accept the proposed 5x cap. We offer a compromise super-cap of 3x exclusively for verified data breach claims.

2. Payment Schedule (Clause 8): We can agree to Net 45 payment terms (rather than Net 60) if invoices are paid electronically.

Please let us know if we can finalize these adjustments.

Best regards,
Pacto Legal Operations Team
`.trim()
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            <GitCompare className="w-3.5 h-3.5" />
            <span>Feature 6 Showcase • Negotiation Center & Diff Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Contract Version Negotiation Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Compare Contract V1 vs V2 side-by-side to highlight added, removed, and modified clauses, financial variance, and AI counter-proposals.
          </p>
        </div>
      </div>

      {/* Version Selector Control Bar */}
      <div className="glass-panel rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500">Base Version (V1):</span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs font-mono font-bold text-slate-900 dark:text-slate-100">
            Acme MSA (Original Draft)
          </span>
        </div>

        <GitCompare className="w-5 h-5 text-blue-500 shrink-0 hidden sm:block" />

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500">Revised Version (V2):</span>
          <span className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            Acme MSA (Client Markups)
          </span>
        </div>
      </div>

      {/* Financial & Liability Variance Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Net Profit Margin Shift</span>
          <div className="flex items-center space-x-2 font-mono">
            <span className="text-lg text-slate-400 line-through">{DIFF_SUMMARY.financialVariance.netMarginA}%</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-2xl font-bold text-rose-500">{DIFF_SUMMARY.financialVariance.netMarginB}%</span>
          </div>
          <span className="text-[10px] text-rose-500 font-semibold">-4.6% Margin Erosion</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Liability Cap Escalation</span>
          <div className="flex items-center space-x-2 font-mono">
            <span className="text-lg text-slate-400">2x Cap</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-2xl font-bold text-rose-500">5x Cap ($7.25M)</span>
          </div>
          <span className="text-[10px] text-rose-500 font-semibold">Exceeds Playbook Ceiling</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel bg-slate-900 text-white space-y-1">
          <span className="text-xs font-semibold text-slate-400">Payment Schedule Shift</span>
          <div className="flex items-center space-x-2 font-mono">
            <span className="text-lg text-slate-400">Net 30</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-2xl font-bold text-amber-400">Net 60</span>
          </div>
          <span className="text-[10px] text-amber-400 font-semibold">+30 Days Cash Delay</span>
        </div>

      </div>

      {/* Side-by-Side Clause Diff Engine */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Edit3 className="w-4 h-4 text-blue-500" />
          <span>Modified Clauses (Version 1 vs Version 2)</span>
        </h3>

        {DIFF_SUMMARY.modifiedClauses.map((item, idx) => (
          <div key={idx} className="glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                {item.whoBenefits}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Version 1 (Original Wording)</span>
                <p className="text-slate-700 dark:text-slate-300">"{item.oldText}"</p>
              </div>
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 space-y-1">
                <span className="text-[10px] text-rose-500 uppercase font-bold block">Version 2 (Client Markup)</span>
                <p>"{item.newText}"</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> AI Change Analysis & Business Impact
              </span>
              <p className="text-slate-700 dark:text-slate-300">{item.changeExplanation} {item.businessImpact}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Suggested Response Draft */}
      <div className="glass-panel rounded-3xl p-6 bg-slate-900 text-white space-y-4 border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-400 animate-spin" />
            <h3 className="text-sm font-bold">Pacto AI Counter-Proposal Response Generator</h3>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(DIFF_SUMMARY.suggestedResponseDraft);
              setCopiedDraft(true);
              setTimeout(() => setCopiedDraft(false), 2000);
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-1.5"
          >
            {copiedDraft ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedDraft ? 'Copied Response!' : 'Copy Counter-Proposal'}</span>
          </button>
        </div>

        <p className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800 whitespace-pre-wrap">
          {DIFF_SUMMARY.suggestedResponseDraft}
        </p>
      </div>

    </div>
  );
}
