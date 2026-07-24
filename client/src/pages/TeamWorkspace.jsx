import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, UserPlus, Shield, CheckCircle2, XCircle, 
  Clock, ArrowRight, Lock, Mail, X, Send, Sparkles, Copy, Check, ExternalLink,
  Trash2, UserCheck, ShieldAlert, AlertCircle, RefreshCw
} from 'lucide-react';

export default function TeamWorkspace() {
  const { 
    user, 
    teamMembers, 
    fetchTeam, 
    inviteMember, 
    updateMemberRole, 
    removeMember, 
    revokeInvite,
    notifications 
  } = useApp();

  // Modal & Invitation State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'Legal'
  });
  
  const [lastInviteResult, setLastInviteResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedRoleMember, setSelectedRoleMember] = useState(null);

  const isOwnerOrAdmin = user?.role === 'Owner' || user?.role === 'Admin';

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!inviteForm.email) return;

    setIsSubmitting(true);
    setInviteError('');

    const res = await inviteMember(inviteForm.email, inviteForm.role);
    setIsSubmitting(false);

    if (res.success) {
      setLastInviteResult(res.invitation);
      setShowInviteModal(false);
      setInviteForm({ email: '', role: 'Legal' });
    } else {
      setInviteError(res.error || 'Failed to issue invitation.');
    }
  };

  const handleRoleChange = async (memberId, newRole) => {
    await updateMemberRole(memberId, newRole);
    setSelectedRoleMember(null);
  };

  const handleRemoveUser = async (memberId, memberName) => {
    if (window.confirm(`Are you sure you want to remove ${memberName} from this organization?`)) {
      await removeMember(memberId);
    }
  };

  const handleRevokeInvite = async (inviteId) => {
    await revokeInvite(inviteId);
  };

  const formatJoinedDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch(e) {
      return 'N/A';
    }
  };

  const formatLastActive = (dateStr) => {
    if (!dateStr) return 'Pending Signup';
    try {
      const diffMs = new Date() - new Date(dateStr);
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 5) return 'Active now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return new Date(dateStr).toLocaleDateString();
    } catch(e) {
      return 'Recently';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Organization: {user?.organizationName || 'Pacto Enterprise'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Team Workspace & Roles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Isolated multi-tenant team directory synchronized live with MongoDB.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchTeam(user?.organizationId)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-all"
            title="Refresh Team Directory"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {isOwnerOrAdmin && (
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite Team Member</span>
            </button>
          )}
        </div>
      </div>

      {/* Success Notification Banner */}
      {lastInviteResult && (
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-slate-900 dark:text-slate-100 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Invitation Sent to {lastInviteResult.email}! Secure Token Stored in MongoDB.</span>
            </div>
            <button onClick={() => setLastInviteResult(null)} className="text-xs text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 text-slate-100 p-3 rounded-xl border border-slate-800 font-mono text-xs">
            <span className="truncate">{lastInviteResult.inviteLink}</span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(lastInviteResult.inviteLink);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-sans font-semibold text-xs flex items-center justify-center gap-1 hover:bg-blue-700"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Link!' : 'Copy Activation Link'}</span>
              </button>

              <a
                href={lastInviteResult.inviteLink}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-sans font-semibold text-xs flex items-center justify-center gap-1 hover:bg-emerald-700"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Accept Invitation</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Team Members List */}
      <div className="glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Organization Members ({teamMembers.length})
            </h3>
            <p className="text-xs text-slate-500">
              Real-time user directory for <strong className="text-blue-500">{user?.organizationName}</strong>
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            Workspace ID: {user?.workspaceId || 'Main Workspace'}
          </span>
        </div>

        {teamMembers.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Users className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Only You in This Organization</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You are the first member and Owner of this organization. Click "Invite Team Member" above to add your colleagues.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((m) => (
              <div 
                key={m.id} 
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between hover:border-blue-500/40 transition-all space-x-3"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img 
                    src={m.avatar} 
                    alt={m.name} 
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0" 
                  />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{m.name}</h4>
                      {m.email === user?.email && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">You</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{m.email}</p>

                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">
                        {m.role}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Joined: {formatJoinedDate(m.joinedDate)}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Last Active: {formatLastActive(m.lastActive)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                    m.status === 'Active Member' 
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse'
                  }`}>
                    {m.status}
                  </span>

                  {isOwnerOrAdmin && m.email !== user?.email && (
                    <div className="flex items-center space-x-1">
                      {!m.isPending ? (
                        <>
                          <button
                            onClick={() => setSelectedRoleMember(m)}
                            className="px-2 py-1 text-[10px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold hover:border-blue-500"
                          >
                            Change Role
                          </button>
                          <button
                            onClick={() => handleRemoveUser(m._id || m.id, m.name)}
                            className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/10"
                            title="Remove Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleRevokeInvite(m.inviteId)}
                          className="px-2 py-1 text-[10px] rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-500 font-semibold hover:bg-rose-500/20"
                        >
                          Revoke Invite
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Role Management Modal */}
      {selectedRoleMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Update Role for {selectedRoleMember.name}
              </h3>
              <button onClick={() => setSelectedRoleMember(null)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Select Role</label>
              <div className="grid grid-cols-1 gap-2">
                {['Owner', 'Admin', 'Legal', 'Finance', 'Procurement', 'Sales', 'Viewer'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleChange(selectedRoleMember._id || selectedRoleMember.id, r)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                      selectedRoleMember.role === r 
                        ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-white hover:border-slate-400'
                    }`}
                  >
                    <span>{r}</span>
                    {selectedRoleMember.role === r && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contract & Organization Notifications Activity */}
      <div className="glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Organization Event Audit Log (MongoDB)</h3>

        {notifications.length === 0 ? (
          <p className="text-xs text-slate-500">No activity recorded yet for this organization.</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n._id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{n.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{new Date(n.createdAt).toLocaleTimeString()}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{n.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INVITE TEAM MEMBER MODAL */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleSendInvite} className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Invite Team Member</h3>
                  <p className="text-[11px] text-slate-500">Org: {user?.organizationName}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setShowInviteModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {inviteError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{inviteError}</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Work Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="colleague@yourcompany.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Assigned Organization Role</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Owner">Owner (Full Admin Access)</option>
                  <option value="Admin">Admin (Team & Settings)</option>
                  <option value="Legal">Legal Counsel (Contracts & Compliance)</option>
                  <option value="Finance">Finance (P&L & Commercial Caps)</option>
                  <option value="Procurement">Procurement (Vendor Agreements)</option>
                  <option value="Sales">Sales (MSAs & Deal Terms)</option>
                  <option value="Viewer">Viewer (Read-Only Access)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Generating Token...' : 'Generate & Send Invitation'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
