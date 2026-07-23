import React from 'react';
import { FileText, Plus } from 'lucide-react';

export default function AdminTemplates() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white">Standard Contract Template Library</h1>
          <p className="text-xs text-slate-400">Manage standard system templates (MSA, NDA, SaaS, SOW) available to all users.</p>
        </div>
        <button onClick={() => alert('New Template Creator Opened')} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
          + Add Master Template
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        {['Master Services Agreement (MSA v4)', 'Mutual NDA Standard 2026', 'SaaS Subscription SLA', 'Vendor Procurement Contract'].map((t, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <h4 className="font-bold text-white">{t}</h4>
            <span className="text-[10px] text-slate-500 font-mono">System Standard • Verified</span>
          </div>
        ))}
      </div>
    </div>
  );
}
