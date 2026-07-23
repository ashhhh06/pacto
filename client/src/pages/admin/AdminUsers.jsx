import React from 'react';
import { Users, Shield, CheckCircle2, UserCheck } from 'lucide-react';

export default function AdminUsers() {
  const USERS = [
    { id: '1', name: 'Victoria Chen', email: 'victoria.chen@pacto.io', role: 'Enterprise Admin', workspace: 'Pacto Global', status: 'Active' },
    { id: '2', name: 'Marcus Vance', email: 'marcus.vance@pacto.io', role: 'Legal Lead', workspace: 'Pacto EMEA', status: 'Active' },
    { id: '3', name: 'Elena Rostova', email: 'elena.rostova@pacto.io', role: 'Finance Admin', workspace: 'Pacto APAC', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">Registered User Directory</h1>
        <p className="text-xs text-slate-400">Manage user accounts, toggle roles, and monitor workspace assignments.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-800/80 text-slate-400 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-3">User Name & Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Workspace</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {USERS.map(u => (
              <tr key={u.id}>
                <td className="p-3 font-semibold text-white">{u.name} ({u.email})</td>
                <td className="p-3 font-mono text-cyan-400">{u.role}</td>
                <td className="p-3">{u.workspace}</td>
                <td className="p-3"><span className="text-emerald-400 font-bold">{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
