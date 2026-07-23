import React from 'react';
import { Cpu, Activity } from 'lucide-react';

export default function AdminAIUsage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">Gemini AI API Token Usage & Latency Logs</h1>
        <p className="text-xs text-slate-400">Track Gemini API calls, token consumption per organization, and response latencies.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400">Daily API Calls</span>
          <p className="text-xl font-mono font-bold text-cyan-400">42,500</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400">Average Inference Latency</span>
          <p className="text-xl font-mono font-bold text-emerald-400">380 ms</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400">Monthly Cost Estimate</span>
          <p className="text-xl font-mono font-bold text-blue-400">$340.00</p>
        </div>
      </div>
    </div>
  );
}
