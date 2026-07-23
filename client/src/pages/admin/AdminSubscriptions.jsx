import React from 'react';
import { DollarSign, CheckCircle2 } from 'lucide-react';

export default function AdminSubscriptions() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">SaaS Subscriptions & Tenant Billing</h1>
        <p className="text-xs text-slate-400">Enterprise tenant plans, billing status, and MRR tracking.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
        <div className="flex justify-between items-center p-3 rounded bg-slate-800/60">
          <div>
            <h4 className="font-bold text-white">Acme Corp Enterprise Tenant</h4>
            <span className="text-[10px] text-slate-400">Custom Enterprise Plan • 50 Seats</span>
          </div>
          <span className="font-mono font-bold text-emerald-400">$4,500 / mo</span>
        </div>

        <div className="flex justify-between items-center p-3 rounded bg-slate-800/60">
          <div>
            <h4 className="font-bold text-white">CloudScale Systems Tenant</h4>
            <span className="text-[10px] text-slate-400">Pro Plan • 15 Seats</span>
          </div>
          <span className="font-mono font-bold text-emerald-400">$1,200 / mo</span>
        </div>
      </div>
    </div>
  );
}
