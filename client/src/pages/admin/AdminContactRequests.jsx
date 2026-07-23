import React from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function AdminContactRequests() {
  const REQUESTS = [
    { id: '1', name: 'Jonathan Vance', company: 'Goldman & Partners', email: 'jvance@goldman.com', plan: 'Enterprise Demo Request', date: 'Today' },
    { id: '2', name: 'Sophia Loren', company: 'HealthTech Global', email: 'sloren@healthtech.org', plan: 'Custom Contract Intelligence', date: 'Yesterday' }
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">Sales Inquiries & Demo Requests</h1>
        <p className="text-xs text-slate-400">Incoming enterprise contact requests submitted from the Pacto marketing website.</p>
      </div>

      <div className="space-y-3 text-xs">
        {REQUESTS.map((r) => (
          <div key={r.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between font-bold text-white">
              <span>{r.name} ({r.company})</span>
              <span className="text-blue-400">{r.plan}</span>
            </div>
            <p className="text-slate-400">Email: {r.email} • Received: {r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
