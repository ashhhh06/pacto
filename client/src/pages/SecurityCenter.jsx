import React, { useState, useEffect } from 'react';
import { ShieldCheck, Database, Lock, CheckCircle2, Clock, Terminal, RefreshCw, Key } from 'lucide-react';

export default function SecurityCenter() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const resp = await fetch('/api/audit');
      if (resp.ok) {
        const data = await resp.json();
        setLogs(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="pb-6 border-b border-slate-200 dark:border-obsidian-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>Security &</span>
            <span className="gradient-text-emerald">Audit Log Center</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time audit log stream persisted directly in MongoDB Atlas.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-obsidian-800 hover:bg-slate-300 dark:hover:bg-obsidian-700 text-slate-800 dark:text-slate-200 flex items-center space-x-1.5 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Feed</span>
        </button>
      </div>

      {/* Compliance Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center space-x-2 text-emerald-500">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold text-sm text-slate-900 dark:text-white">SOC 2 Type II</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Audited annually for security, availability, and processing integrity.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center space-x-2 text-emerald-500">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold text-sm text-slate-900 dark:text-white">ISO 27001</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            International security standard for information safety management.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center space-x-2 text-emerald-500">
            <Key className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-sm text-slate-900 dark:text-white">AES-256 Encryption</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Database objects encrypted at rest using system sandbox keys.
          </p>
        </div>
      </div>

      {/* MongoDB Live Audit Stream Table */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">MongoDB Audit Collection ("auditlogs")</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">{logs.length} Total Log Entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-obsidian-900 text-slate-700 dark:text-slate-300 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-obsidian-800">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Action</th>
                <th className="p-3">User Email</th>
                <th className="p-3">Details</th>
                <th className="p-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-obsidian-800">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-500">
                    No audit records retrieved.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id || log.id} className="hover:bg-slate-100/50 dark:hover:bg-obsidian-900/50 transition-colors">
                    <td className="p-3 font-mono text-[11px] whitespace-nowrap text-slate-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-900 dark:text-white">
                      {log.userEmail}
                    </td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">
                      {log.details}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-400">
                      {log.ipAddress}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
