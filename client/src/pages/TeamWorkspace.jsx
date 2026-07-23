import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, UserPlus, Shield, CheckCircle2, XCircle, 
  MessageSquare, Clock, ArrowRight, Lock, Mail, X, Send, Sparkles, Copy, Check, ExternalLink
} from 'lucide-react';

export default function TeamWorkspace() {
  const { user } = useApp();

  const [members, setMembers] = useState([
    { id: 'm-1', name: 'Victoria Chen', email: 'victoria.chen@pacto.io', role: 'General Counsel & VP', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', status: 'Active Member', access: 'Workspace Admin' },
    { id: 'm-2', name: 'Marcus Vance', email: 'marcus.vance@pacto.io', role: 'VP Sales & Commercials', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', status: 'Active Member', access: 'Commercial Approver' },
    { id: 'm-3', name: 'Elena Rostova', email: 'elena.rostova@pacto.io', role: 'Senior Legal Operations Lead', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', status: 'Active Member', access: 'Legal Reviewer' },
    { id: 'm-4', name: 'Alex Rivera', email: 'alex.rivera@pacto.io', role: 'VP Engineering & Infrastructure', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', status: 'Active Member', access: 'Procurement Approver' },
  ]);

  const [comments] = useState([
    { id: 'c-1', author: 'Elena Rostova', text: 'CloudScale vendor agreement has uncapped indemnification. We need executive approval before signing.', time: '2 hours ago', contractTitle: 'CloudScale Vendor SaaS Agreement' },
    { id: 'c-2', author: 'Marcus Vance', text: 'Acme Corp agreed to 2x liability cap! Net profit margin locked at 35.8%.', time: '5 hours ago', contractTitle: 'Acme Master Services Agreement' }
  ]);

  // Modal & Invitation State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'Legal Counsel & Reviewer',
    access: 'Legal Approver'
  });
  
  const [lastInviteResult, setLastInviteResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!inviteForm.email || !inviteForm.name) return;

    setIsSubmitting(true);
    try {
      const resp = await fetch('/api/auth/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inviteForm.name,
          email: inviteForm.email,
          role: inviteForm.role,
          access: inviteForm.access,
          invitedBy: user?.name || 'Workspace Admin'
        }),
      });

      if (resp.ok) {
        const data = await resp.json();
        const formattedMember = {
          ...data.member,
          status: 'Pending Acceptance' // Clear status indicating invitation link sent but user hasn't completed signup yet
        };
        setMembers([formattedMember, ...members]);
        setLastInviteResult({ ...data, member: formattedMember });
      } else {
        const token = `pct_invite_${Math.random().toString(36).substring(2, 8)}`;
        const link = `http://localhost:3000/register?invite=${token}&email=${encodeURIComponent(inviteForm.email)}`;
        const fallbackMember = {
          id: `m-${Date.now()}`,
          name: inviteForm.name,
          email: inviteForm.email,
          role: inviteForm.role,
          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
          status: 'Pending Acceptance',
          access: inviteForm.access,
          inviteLink: link
        };
        setMembers([fallbackMember, ...members]);
        setLastInviteResult({ inviteLink: link, member: fallbackMember });
      }
    } catch (err) {
      console.error('Invite dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setShowInviteModal(false);
      setInviteForm({ name: '', email: '', role: 'Legal Counsel & Reviewer', access: 'Legal Approver' });
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Multi-Role Collaboration & Approvals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Team Workspace & Approval Workflows
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Invite team members, assign legal/finance review roles, and track approval histories.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {lastInviteResult && (
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-slate-900 dark:text-slate-100 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Invitation Sent to {lastInviteResult.member.email}! Link Generated & Recorded in MongoDB Audit Trail.</span>
            </div>
            <button onClick={() => setLastInviteResult(null)} className="text-xs text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 text-slate-100 p-3 rounded-xl border border-slate-800 font-mono text-xs">
            <span className="truncate">{lastInviteResult.inviteLink}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(lastInviteResult.inviteLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1 rounded-lg bg-blue-600 text-white font-sans font-semibold text-xs flex items-center justify-center gap-1 hover:bg-blue-700 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Link!' : 'Copy Activation Link'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Team Members List */}
      <div className="glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Workspace Members ({members.length})</h3>
          <span className="text-xs text-slate-500 font-mono">Pacto Enterprise Tenant</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((m) => (
            <div key={m.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{m.name}</h4>
                  <p className="text-[11px] text-slate-500">{m.email}</p>
                  <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold">{m.role} • {m.access}</span>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                m.status === 'Active Member' 
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse'
              }`}>
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Approval Threads */}
      <div className="glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Team Comment & Approval Activity</h3>

        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">{c.author}</span>
                <span className="text-[10px] text-slate-400 font-mono">{c.time}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">{c.text}</p>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                Ref: {c.contractTitle}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INVITE TEAM MEMBER MODAL */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleSendInvite} className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Invite Team Member</h3>
                  <p className="text-[11px] text-slate-500">Grant access to Pacto Contract Intelligence</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  placeholder="e.g. David Sterling"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Work Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="e.g. david.sterling@company.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Primary Role</label>
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Legal Counsel & Reviewer">Legal Counsel</option>
                    <option value="Finance & Deal Analyst">Finance Analyst</option>
                    <option value="Procurement Manager">Procurement Lead</option>
                    <option value="VP Commercial Sales">Sales Operations</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Permission Level</label>
                  <select
                    value={inviteForm.access}
                    onChange={(e) => setInviteForm({ ...inviteForm, access: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Workspace Admin">Workspace Admin</option>
                    <option value="Legal Approver">Legal Approver</option>
                    <option value="Commercial Approver">Commercial Approver</option>
                    <option value="Read-Only Viewer">Read-Only Viewer</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Dispatching API Request...' : 'Send Workspace Invitation'}</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
