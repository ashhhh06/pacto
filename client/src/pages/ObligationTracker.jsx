import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckSquare, Plus, Clock, User, AlertCircle, CheckCircle2, 
  Sparkles, Calendar, Bell, Filter
} from 'lucide-react';

export default function ObligationTracker() {
  const { contracts, addObligation, toggleObligationStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedContractId, setSelectedContractId] = useState(contracts[0]?.id || 'ctr-101');
  const [newTask, setNewTask] = useState('');
  const [newOwner, setNewOwner] = useState('DevOps Lead');
  const [newDueDate, setNewDueDate] = useState('2026-10-15');
  const [newPriority, setNewPriority] = useState('High');

  const allObligations = contracts.flatMap(c => 
    (c.obligations || []).map(ob => ({ ...ob, contractTitle: c.title, contractId: c.id, client: c.client }))
  );

  const filteredObligations = allObligations.filter(ob => {
    if (filterStatus === 'All') return true;
    return ob.status === filterStatus;
  });

  const handleCreateObligation = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addObligation(selectedContractId, newTask, newOwner, newDueDate, newPriority);
    setNewTask('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Feature 8 Showcase • Contract Obligation Task Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Obligation & Deliverables Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Automatically extract contractual commitments into assigned tasks with owners, due dates, and reminders.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Obligation Task</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Total Extracted Obligations</span>
          <p className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">{allObligations.length}</p>
          <span className="text-[10px] text-blue-500 font-semibold">Extracted from 4 Agreements</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Pending Deliverables</span>
          <p className="text-2xl font-extrabold font-mono text-amber-500">
            {allObligations.filter(o => o.status !== 'Completed').length} Pending
          </p>
          <span className="text-[10px] text-slate-400">Reminders Active</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel bg-slate-900 text-white space-y-1">
          <span className="text-xs font-semibold text-slate-400">Completed Obligations</span>
          <p className="text-2xl font-extrabold font-mono text-emerald-400">
            {allObligations.filter(o => o.status === 'Completed').length} Verified
          </p>
          <span className="text-[10px] text-emerald-400 font-semibold">100% Audit Tracked</span>
        </div>
      </div>

      {/* Filter Tabs & Task List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredObligations.map((ob) => (
            <div
              key={ob.id}
              className={`p-4 rounded-2xl glass-panel border transition-all flex items-center justify-between gap-4 ${
                ob.status === 'Completed' ? 'bg-slate-50/50 dark:bg-slate-900/40 opacity-75' : 'bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <button
                  onClick={() => toggleObligationStatus(ob.contractId, ob.id)}
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                    ob.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-300 dark:border-slate-600 hover:border-blue-500'
                  }`}
                >
                  {ob.status === 'Completed' && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>

                <div className="space-y-0.5">
                  <h4 className={`text-xs font-bold ${ob.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                    {ob.task}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Contract: <strong className="text-blue-600 dark:text-blue-400">{ob.contractTitle}</strong> • Client: {ob.client}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1.5 text-slate-500 font-mono text-[11px]">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ob.owner}</span>
                </div>

                <div className="flex items-center space-x-1.5 text-slate-500 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Due {ob.dueDate}</span>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  ob.priority === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {ob.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <form onSubmit={handleCreateObligation} className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Create Obligation Task</h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Select Agreement</label>
              <select
                value={selectedContractId}
                onChange={(e) => setSelectedContractId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
              >
                {contracts.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Obligation Task Description</label>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="e.g. Execute Quarterly Security Vulnerability Audit"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Assigned Owner</label>
                <input
                  type="text"
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white"
              >
                Save Obligation
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
