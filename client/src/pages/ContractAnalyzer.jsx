import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  FileText, Search, Plus, Sparkles, Filter, ShieldAlert, CheckCircle2, 
  Trash2, Eye, ArrowRight, DollarSign, X, SlidersHorizontal
} from 'lucide-react';
import RiskGauge from '../components/RiskGauge';

export default function ContractAnalyzer() {
  const { contracts, deleteContract } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedContract, setSelectedContract] = useState(null);

  const filteredContracts = contracts.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.client.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>Centralized Enterprise Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Contracts Repository & Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            View, filter, and inspect enterprise agreements with real-time risk scores and financial metrics.
          </p>
        </div>

        <Link
          to="/dashboard/ai-review"
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Upload & Review Contract</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contracts by title, client, or category..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          {['All', 'Sales', 'Procurement', 'Services', 'Business Development'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Contracts Table */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Contract Title & Client</th>
                <th className="p-4">Category / Type</th>
                <th className="p-4">Value ($)</th>
                <th className="p-4">Net Profit Margin</th>
                <th className="p-4">Legal Risk Score</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredContracts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block hover:text-blue-500 cursor-pointer" onClick={() => setSelectedContract(c)}>
                          {c.title}
                        </span>
                        <span className="text-[11px] text-slate-500">{c.client} • {c.governingLaw}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                      {c.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                    ${c.value?.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {c.profitMargin}%
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      c.riskScore > 50 
                        ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' 
                        : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    }`}>
                      Risk: {c.riskScore}/100
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedContract(c)}
                      className="p-1.5 rounded-lg border text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800"
                      title="Inspect Contract Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteContract(c.id)}
                      className="p-1.5 rounded-lg border text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800"
                      title="Delete Agreement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contract Detail Drawer Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-xl h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 space-y-6 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-500">{selectedContract.type}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedContract.title}</h3>
                <p className="text-xs text-slate-500">Client: {selectedContract.client}</p>
              </div>
              <button onClick={() => setSelectedContract(null)} className="p-2 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Contract Value</span>
                <p className="text-lg font-bold font-mono text-blue-600">${selectedContract.value?.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Net Margin</span>
                <p className="text-lg font-bold font-mono text-emerald-500">{selectedContract.profitMargin}%</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Extracted Key Clauses</h4>
              {selectedContract.clauses?.map(cl => (
                <div key={cl.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white">{cl.name}</span>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">"{cl.text}"</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t flex justify-end">
              <Link
                to="/dashboard/bi-simulator"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white"
              >
                Simulate P&L Variations →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
