import React, { useState } from 'react';
import { Search, Sparkles, X, ArrowRight, ShieldAlert, DollarSign, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function AISearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);
  const { contracts } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const SAMPLE_QUERIES = [
    'Find contracts expiring this month',
    'Which contracts have unlimited liability risk?',
    'Show all agreements with Net 30 payment terms',
    'Which contracts have high profit margins (>35%)?'
  ];

  const handleSearch = (searchPrompt = query) => {
    if (!searchPrompt.trim()) return;
    setQuery(searchPrompt);
    setIsSearching(true);
    setResult(null);

    // Simulate AI natural language processing against portfolio
    setTimeout(() => {
      const q = searchPrompt.toLowerCase();
      let matchedContracts = [];
      let aiExplanation = '';

      if (q.includes('expire') || q.includes('expiring')) {
        matchedContracts = contracts.filter(c => c.status === 'Active');
        aiExplanation = `Identified ${matchedContracts.length} active enterprise agreements in your portfolio. Acme MSA is scheduled for auto-renewal review within the next 90 days.`;
      } else if (q.includes('unlimited') || q.includes('liability') || q.includes('risk')) {
        matchedContracts = contracts.filter(c => c.riskScore > 50 || c.clauses.some(cl => cl.riskLevel === 'High'));
        aiExplanation = `Flagged CloudScale Systems Vendor Agreement as HIGH RISK due to uncapped direct damage indemnity clause. Recommending legal renegotiation.`;
      } else if (q.includes('margin') || q.includes('profit') || q.includes('revenue')) {
        matchedContracts = contracts.filter(c => c.profitMargin > 30);
        aiExplanation = `Found ${matchedContracts.length} high-profit contracts generating over 35% margin. Apex Capital Partnership yields the highest net margin at 53.0%.`;
      } else if (q.includes('net 30') || q.includes('payment')) {
        matchedContracts = contracts.filter(c => c.paymentTerms === 'Net 30');
        aiExplanation = `Found ${matchedContracts.length} agreements operating on Net 30 payment schedules with standard 1.5% monthly late fee enforcement.`;
      } else {
        matchedContracts = contracts.slice(0, 3);
        aiExplanation = `Analyzed your contract database. Found ${matchedContracts.length} relevant agreements matching "${searchPrompt}".`;
      }

      setResult({
        summary: aiExplanation,
        items: matchedContracts
      });
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Ask Pacto AI... (e.g. 'Which contracts have unlimited liability?')"
            className="flex-1 bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-0 text-base font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => handleSearch()}
              disabled={isSearching}
              className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1"
            >
              Search
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Sample Prompts */}
        {!result && !isSearching && (
          <div className="p-5 space-y-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Suggested Enterprise Questions
            </div>
            <div className="grid grid-cols-1 gap-2">
              {SAMPLE_QUERIES.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(prompt)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-left hover:border-blue-500/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all text-xs font-medium text-slate-700 dark:text-slate-200 group"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    {prompt}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isSearching && (
          <div className="p-8 text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-500/10 text-blue-500 animate-spin">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Pacto Contract Intelligence is querying portfolio vectors...
            </p>
          </div>
        )}

        {/* AI Results */}
        {result && (
          <div className="p-5 space-y-4 max-h-[420px] overflow-y-auto">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-slate-800 dark:text-slate-200 text-xs leading-relaxed flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-blue-600 dark:text-blue-400 block mb-1">AI Executive Analysis</span>
                {result.summary}
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Matched Contracts ({result.items.length})
            </div>

            <div className="space-y-2">
              {result.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onClose();
                    navigate('/dashboard/contracts');
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-500/40 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-200/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.client} • {item.type} • Value: ${item.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                      item.riskScore > 50 
                        ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' 
                        : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    }`}>
                      Risk: {item.riskScore}/100
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-200 dark:bg-slate-700 rounded border">ESC</kbd> to close</span>
          <span className="flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400">
            Powered by Pacto AI Engine
          </span>
        </div>
      </div>
    </div>
  );
}
