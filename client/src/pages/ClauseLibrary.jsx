import React, { useState } from 'react';
import { 
  BookOpen, Search, Sparkles, ShieldAlert, CheckCircle2, 
  ArrowRight, Copy, Info, Check, Filter
} from 'lucide-react';

export default function ClauseLibrary() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedClause, setSelectedClause] = useState(null);

  const CLAUSES = [
    {
      id: 'cl-1',
      name: 'Limitation of Liability (2x Cap)',
      category: 'Liability',
      riskLevel: 'Low',
      policyMatch: true,
      text: 'Neither party shall be liable for indirect, incidental, or consequential damages. Aggregate direct liability is capped at 2x total contract value.',
      summary: 'Caps total monetary liability at 2x annual contract fees. Protects vendor and client from catastrophic consequential damages.',
      purpose: 'Limits financial exposure to predictable operational boundaries.',
      industryStandard: '1x to 2x Annual Contract Value.',
      alternativeClauses: [
        'Cap at 1x Annual Fees (Standard Fallback)',
        'Super-cap of 3x for Data Breach Indemnity'
      ],
      negotiationTips: 'Clients often push for uncapped liability; strictly enforce 2x cap for SaaS data workloads.'
    },
    {
      id: 'cl-2',
      name: 'Intellectual Property Rights Retainment',
      category: 'IP Rights',
      riskLevel: 'Low',
      policyMatch: true,
      text: 'All background IP, AI algorithms, models, and derivative works created during the performance of services remain the exclusive property of Pacto Technologies.',
      summary: 'Pacto retains 100% ownership over all core software, algorithms, and AI models.',
      purpose: 'Prevents customer IP leak and forbids work-for-hire transfers on core SaaS code.',
      industryStandard: 'Vendor retains background & engine IP; client receives non-exclusive user license.',
      alternativeClauses: [
        'Provide client with perpetual internal operational usage license.'
      ],
      negotiationTips: 'Never allow work-for-hire wording for core product features.'
    },
    {
      id: 'cl-3',
      name: 'Unlimited Third-Party Indemnification (High Risk)',
      category: 'Indemnification',
      riskLevel: 'High',
      policyMatch: false,
      text: 'Provider agrees to indemnify and hold harmless Customer from any third-party claims without any monetary ceiling or limitation.',
      summary: 'UNLIMITED LIABILITY RISK. Violates company policy rule #2.',
      purpose: 'Shifts all external liability onto Provider with zero financial ceiling.',
      industryStandard: 'Indemnity capped at 2x Contract Value or capped at Insurance coverage limits.',
      alternativeClauses: [
        'Cap indemnification at $1,000,000 or 2x Annual Contract Fees.'
      ],
      negotiationTips: 'REJECT THIS CLAUSE IMMEDIATELY. Offer capped indemnification instead.'
    },
    {
      id: 'cl-4',
      name: 'Payment Terms & Late Compound Penalty',
      category: 'Finance',
      riskLevel: 'Medium',
      policyMatch: true,
      text: 'Invoices due within 30 days of receipt. Late balances accrue 1.5% monthly compound interest.',
      summary: 'Net 30 payment schedule with 18% annual late fee penalty.',
      purpose: 'Ensures cash flow predictability and disincentivizes late payments.',
      industryStandard: 'Net 30 or Net 45.',
      alternativeClauses: [
        'Provide 15-day grace period before late interest applies.'
      ],
      negotiationTips: 'If customer demands Net 60, request 2% early payment incentive for Net 30.'
    }
  ];

  const filteredClauses = CLAUSES.filter(cl => {
    const matchesSearch = cl.name.toLowerCase().includes(search.toLowerCase()) || cl.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || cl.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Feature 5 Showcase • Clickable Clause Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Clause Intelligence & Battlecards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Click any clause to inspect plain English explanations, legal intent, risk benchmarks, and negotiation tips.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clause library by title or keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          {['All', 'Liability', 'IP Rights', 'Indemnification', 'Finance'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clauses Grid & Detail Modal/Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Clauses List (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          {filteredClauses.map((cl) => (
            <div
              key={cl.id}
              onClick={() => setSelectedClause(cl)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all glass-panel ${
                selectedClause?.id === cl.id
                  ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-500/5'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{cl.name}</span>
                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                  cl.riskLevel === 'High'
                    ? 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                }`}>
                  {cl.riskLevel} Risk
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">{cl.summary}</p>
              <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2">
                <span>Category: {cl.category}</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Click Intelligence Battlecard →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Clause Intelligence Inspector (6 Cols) */}
        <div className="lg:col-span-6">
          {selectedClause ? (
            <div className="glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 sticky top-24 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-purple-500 font-bold uppercase">{selectedClause.category}</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedClause.name}</h3>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                  selectedClause.policyMatch ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                }`}>
                  {selectedClause.policyMatch ? 'Playbook Approved' : 'Policy Violation'}
                </span>
              </div>

              {/* Exact Text */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Exact Contract Wording</span>
                <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 leading-relaxed">
                  "{selectedClause.text}"
                </p>
              </div>

              {/* Plain English Summary */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Plain English Summary</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{selectedClause.summary}</p>
              </div>

              {/* Industry Standard Benchmark */}
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-1">
                <span className="font-bold text-blue-600 dark:text-blue-400 block">Industry Standard Benchmark</span>
                <p className="text-slate-700 dark:text-slate-300">{selectedClause.industryStandard}</p>
              </div>

              {/* Negotiation Battlecard Tips */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                <span className="font-bold text-amber-600 dark:text-amber-400 block">Pacto Negotiation Battlecard Tip</span>
                <p className="text-slate-700 dark:text-slate-300">{selectedClause.negotiationTips}</p>
              </div>

              {/* Alternative Fallback Clauses */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Recommended Fallback Clauses</span>
                {selectedClause.alternativeClauses.map((alt, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>{alt}</span>
                    <button
                      onClick={() => alert(`Copied fallback clause: "${alt}"`)}
                      className="px-2 py-1 text-[10px] font-semibold bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Copy Wording
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-12 text-center text-slate-400 space-y-2 border border-slate-200 dark:border-slate-800">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs font-medium">Click any clause on the left to inspect intelligence battlecard.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
