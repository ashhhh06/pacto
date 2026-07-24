import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Shield, ArrowRight, CheckCircle2, Building2, User, Lock, Mail, Users, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const inviteToken = searchParams.get('invite');
  const inviteEmail = searchParams.get('email') || '';

  const [step, setStep] = useState(1);
  const [inviteDetails, setInviteDetails] = useState(null);
  const [inviteError, setInviteError] = useState('');
  const [isVerifyingInvite, setIsVerifyingInvite] = useState(Boolean(inviteToken));
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: inviteEmail,
    password: '',
    orgName: '',
    role: 'Legal'
  });

  // Verify invitation token if present in URL
  useEffect(() => {
    if (inviteToken) {
      setIsVerifyingInvite(true);
      fetch(`/api/auth/verify-invite?token=${inviteToken}`)
        .then(res => res.json())
        .then(data => {
          setIsVerifyingInvite(false);
          if (data.valid) {
            setInviteDetails(data);
            setFormData(prev => ({
              ...prev,
              email: data.email || prev.email,
              role: data.role || 'Legal'
            }));
          } else {
            setInviteError(data.error || 'Invitation is invalid or expired.');
          }
        })
        .catch(err => {
          setIsVerifyingInvite(false);
          setInviteError('Failed to verify invitation link.');
        });
    }
  }, [inviteToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // If registering via invitation or step 2 completed
    if (inviteToken || step === 2) {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        orgName: formData.orgName,
        role: formData.role
      }, inviteToken);

      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(res.error || 'Failed to complete registration.');
      }
    } else {
      setStep(2);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold mx-auto">
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {inviteToken ? 'Accept Organization Invitation' : 'Create Enterprise Account'}
          </h1>
          <p className="text-xs text-slate-500">
            {inviteToken 
              ? 'Join your team on Pacto Enterprise Platform' 
              : `Step ${step} of 2 • 14 days full trial, no credit card required.`}
          </p>
        </div>

        {/* Invitation Verification Status Banner */}
        {isVerifyingInvite && (
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Shield className="w-4 h-4 animate-spin" />
            <span>Verifying invitation token...</span>
          </div>
        )}

        {inviteError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{inviteError}</span>
          </div>
        )}

        {inviteDetails && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-slate-900 dark:text-slate-100 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Invitation Verified!</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              You are joining <strong className="text-slate-900 dark:text-white">{inviteDetails.orgName}</strong> as <strong className="text-blue-600 dark:text-blue-400">{inviteDetails.role}</strong>.
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Work Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@yourcompany.com"
                  readOnly={Boolean(inviteToken && inviteEmail)}
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs text-slate-900 dark:text-white ${
                    inviteToken ? 'bg-slate-100 dark:bg-slate-800/60 cursor-not-allowed border-slate-300 dark:border-slate-700' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Organization / Company Name</label>
                <input
                  type="text"
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  placeholder="e.g. Acme Global Technologies"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Primary Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  <option value="Owner">Owner / Executive</option>
                  <option value="Admin">Admin</option>
                  <option value="Legal">Legal Counsel</option>
                  <option value="Finance">Finance Lead</option>
                  <option value="Procurement">Procurement Lead</option>
                  <option value="Sales">Sales Operations</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={Boolean(inviteToken && !inviteDetails)}
            className="w-full py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-md flex items-center justify-center space-x-1 transition-all"
          >
            <span>
              {inviteToken 
                ? 'Join Organization' 
                : step === 1 
                  ? 'Next: Company Setup' 
                  : 'Create Organization & Workspace'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link 
            to={inviteToken ? `/login?invite=${inviteToken}&email=${encodeURIComponent(formData.email)}` : '/login'} 
            className="text-blue-600 font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}
