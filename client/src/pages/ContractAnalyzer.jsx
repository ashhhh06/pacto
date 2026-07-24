import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  FileText, Search, Plus, Sparkles, Filter, ShieldAlert, CheckCircle2, 
  Trash2, Eye, ArrowRight, DollarSign, X, Edit3, User, Calendar
} from 'lucide-react';
import RiskGauge from '../components/RiskGauge';

export default function ContractAnalyzer() {
  const { contracts, deleteContract, editContract, updateContractStatus } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedContract, setSelectedContract] = useState(null);
  const [editingContract, setEditingContract] = useState(null);

  // Edit Modal Form State
  const [editStatus, setEditStatus] = useState('Active');
  const [editOwner, setEditOwner] = useState('Legal Lead');
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('Sales');
  const [editValue, setEditValue] = useState(500000);

  const filteredContracts = contracts.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          (c.client && c.client.toLowerCase().includes(search.toLowerCase())) ||
                          (c.owner && c.owner.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openEditModal = (c) => {
    setEditingContract(c);
    setEditStatus(c.status || 'Active');
    setEditOwner(c.owner || 'Legal Lead');
    setEditTitle(c.title || '');
    setEditCategory(c.category || 'Sales');
    setEditValue(c.value || 500000);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingContract) return;

    await editContract(editingContract.id || editingContract._id, {
      status: editStatus,
      owner: editOwner,
      title: editTitle,
      category: editCategory,
      value: Number(editValue)
    });

    setEditingContract(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>Centralized Repository & Lifecycle Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Contracts Repository & Lifecycle
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            View, filter, inspect, and update contract lifecycle stages (Draft → Under Review → Approved → Active → Expired → Archived).
          </p>
        </div>

        <Link
          to="/dashboard/ai-review"
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Analyze New Contract</span>
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
            placeholder="Search by title, party, or owner..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Sales', 'Procurement', 'Services', 'Business Development', 'NDA'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
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
        {filteredContracts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-400 mx-auto opacity-50" />
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Contracts Found</h4>
            <p className="text-xs text-slate-500">Try adjusting your search query or upload a new contract.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Contract Title & Client</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Lifecycle Status</th>
                  <th className="p-4">Assigned Owner</th>
                  <th className="p-4">Value ($)</th>
                  <th className="p-4">Risk Score</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredContracts.map((c) => (
                  <tr key={c.id || c._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <span 
                            className="font-bold text-slate-900 dark:text-white block hover:text-blue-500 cursor-pointer"
                            onClick={() => setSelectedContract(c)}
                          >
                            {c.title}
                          </span>
                          <span className="text-[11px] text-slate-500">{c.client} • {c.governingLaw}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                        {c.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                        c.status === 'Under Review' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                        c.status === 'Draft' ? 'bg-slate-500/10 text-slate-600 border-slate-500/20' :
                        c.status === 'Approved' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                        'bg-rose-500/10 text-rose-600 border-rose-500/20'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                      {c.owner}
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                      ${c.value?.toLocaleString()}
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
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(c)}
                        className="p-1.5 rounded-lg border text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800"
                        title="Edit Lifecycle & Status"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedContract(c)}
                        className="p-1.5 rounded-lg border text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800"
                        title="Inspect Contract Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete contract "${c.title}"?`)) {
                            deleteContract(c.id || c._id);
                          }
                        }}
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
        )}
      </div>

      {/* EDIT LIFECYCLE MODAL */}
      {editingContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleSaveEdit} className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Edit Contract Details</h3>
              <button type="button" onClick={() => setEditingContract(null)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Contract Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Lifecycle Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                >
                  <option value="Draft">Draft</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                >
                  <option value="Sales">Sales</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Services">Services</option>
                  <option value="Business Development">Business Development</option>
                  <option value="NDA">NDA</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Assigned Owner</label>
                <input
                  type="text"
                  value={editOwner}
                  onChange={(e) => setEditOwner(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Value ($)</label>
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingContract(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Lifecycle Updates
              </button>
            </div>
          </form>
        </div>
      )}

      {/* INSPECT DETAIL DRAWER MODAL */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 space-y-6 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-500">{selectedContract.category}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedContract.title}</h3>
                <p className="text-xs text-slate-500">Client: {selectedContract.client} • Owner: {selectedContract.owner}</p>
              </div>
              <button onClick={() => setSelectedContract(null)} className="p-2 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Lifecycle Stage</span>
                <p className="text-sm font-bold text-blue-600">{selectedContract.status}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Contract Value</span>
                <p className="text-sm font-bold font-mono text-emerald-500">${selectedContract.value?.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Legal Risk Score</span>
                <p className="text-sm font-bold font-mono text-rose-500">{selectedContract.riskScore}/100</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Business Impact & AI Summary</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border">
                {selectedContract.executiveSummary}
              </p>
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

            <div className="pt-4 border-t flex justify-end space-x-2">
              <button
                onClick={() => {
                  openEditModal(selectedContract);
                  setSelectedContract(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700"
              >
                Edit Lifecycle Status →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
