import React from 'react';
import { Users, FileText, Cpu, DollarSign, Activity, Server, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white">System Admin Control Center</h1>
        <p className="text-xs text-slate-400 mt-1">Platform tenancy health, global user metrics, Gemini API token consumption, and MRR.</p>
      </div>

      {/* Admin KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total Active Users</span>
          <p className="text-2xl font-extrabold font-mono text-white">1,420</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+14% this month</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Monthly Recurring Revenue</span>
          <p className="text-2xl font-extrabold font-mono text-emerald-400">$84,500</p>
          <span className="text-[10px] text-emerald-400 font-semibold">ARR: $1.01M</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Gemini Tokens Used</span>
          <p className="text-2xl font-extrabold font-mono text-cyan-400">14.2M</p>
          <span className="text-[10px] text-slate-400">Avg Latency: 420ms</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">System Uptime</span>
          <p className="text-2xl font-extrabold font-mono text-emerald-400">99.98%</p>
          <span className="text-[10px] text-emerald-400 font-semibold">All Systems Operational</span>
        </div>
      </div>

      {/* System Health */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">MongoDB & API Infrastructure Status</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between p-3 rounded bg-slate-800/60">
            <span className="text-slate-300">MongoDB Atlas Production Cluster</span>
            <span className="font-mono text-emerald-400 font-bold">Connected (0.4ms)</span>
          </div>
          <div className="flex justify-between p-3 rounded bg-slate-800/60">
            <span className="text-slate-300">Gemini 1.5 Pro AI Inference Engine</span>
            <span className="font-mono text-emerald-400 font-bold">Online</span>
          </div>
        </div>
      </div>

    </div>
  );
}
