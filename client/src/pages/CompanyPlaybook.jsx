import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, Plus, CheckCircle2, ShieldAlert, Sparkles, 
  ToggleLeft, ToggleRight, AlertTriangle, FileText
} from 'lucide-react';

export default function CompanyPlaybook() {
  const { playbookRules, togglePlaybookRule, addPlaybookRule, contracts } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Liability');
  const [newRule, setNewRule] = useState('');
  const [newSeverity, setNewSeverity] = useState('Mandatory');

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newRule.trim()) return;
    addPlaybookRule({
      title: newTitle,
      category: newCategory,
      rule: newRule,
      severity: newSeverity
    });
    setNewTitle('');
    setNewRule('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Feature 7 Showcase • Enterprise Contracting Policy Rules</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Company Contracting Playbook
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Define organization-wide contracting rules. Every uploaded agreement is checked automatically against these policies.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Playbook Rule</span>
        </button>
      </div>

      {/* Audit Compliance Overview Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Active Playbook Rules</span>
          <p className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
            {playbookRules.filter(r => r.active).length} Rules
          </p>
          <span className="text-[10px] text-emerald-500 font-semibold">100% Enforced on Upload</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Portfolio Compliance Rate</span>
          <p className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            87.5%
          </p>
          <span className="text-[10px] text-slate-400">1 Contract Flagged</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel bg-slate-900 text-white space-y-1">
          <span className="text-xs font-semibold text-slate-400">Policy Breach Sentinel</span>
          <p className="text-2xl font-extrabold font-mono text-rose-400">
            1 High Alert
          </p>
          <span className="text-[10px] text-rose-400 font-semibold">CloudScale Unlimited Liability</span>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Organizational Policy Rules</h3>

        <div className="space-y-3">
          {playbookRules.map((r) => (
            <div key={r.id} className="p-5 rounded-2xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{r.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {r.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    r.severity === 'Mandatory' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {r.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{r.rule}</p>
              </div>

              <button
                onClick={() => togglePlaybookRule(r.id)}
                className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0 ${
                  r.active ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                }`}
              >
                {r.active ? <ToggleRight className="w-5 h-5 text-emerald-500" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
                <span>{r.active ? 'Active' : 'Disabled'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <form onSubmit={handleAddRule} className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Add Company Playbook Rule</h3>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Rule Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Always Require Governing Law under CA/DE"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <option value="Liability">Liability</option>
                  <option value="Confidentiality">Confidentiality</option>
                  <option value="IP Rights">IP Rights</option>
                  <option value="Finance">Finance</option>
                  <option value="Dispute Resolution">Dispute Resolution</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Severity Level</label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <option value="Mandatory">Mandatory (Must Pass)</option>
                  <option value="Important">Important</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Policy Specification Rule</label>
              <textarea
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Explain the required contract language constraint..."
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white"
              >
                Save Rule
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
