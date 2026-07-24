import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Shield, CheckCircle2, UserCheck } from 'lucide-react';

export default function AdminUsers() {
  const { teamMembers, user } = useApp();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">Registered User Directory (MongoDB)</h1>
        <p className="text-xs text-slate-400">
          User accounts and workspace memberships for organization <span className="text-cyan-400 font-bold">{user?.organizationName || 'Pacto Enterprise'}</span>.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {teamMembers.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No additional users registered in this organization yet.
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-400 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">User Name & Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {teamMembers.map(u => (
                <tr key={u.id || u._id}>
                  <td className="p-3 font-semibold text-white">
                    <div className="flex items-center space-x-2">
                      <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full" />
                      <span>{u.name} ({u.email})</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-cyan-400">{u.role}</td>
                  <td className="p-3">
                    <span className={`font-bold ${u.status === 'Active Member' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">
                    {u.joinedDate ? new Date(u.joinedDate).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
