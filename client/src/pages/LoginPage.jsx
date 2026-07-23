import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GoogleLogin } from '@react-oauth/google';
import { Shield, Lock, AlertCircle, Sparkles, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login, loginWithGoogle } = useApp();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState('victoria.chen@pacto.io');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');

    const role = emailInput.includes('admin') ? 'admin' : 'user';
    const success = await login(emailInput, role);
    setIsSubmitting(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setErrorMsg('Failed to sign in. Please try again.');
    }
  };

  const handleQuickPersona = async (email, role, name) => {
    setIsSubmitting(true);
    setErrorMsg('');
    const success = await login(email, role, name);
    setIsSubmitting(false);
    if (success) {
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) return;
    setIsSubmitting(true);
    const res = await loginWithGoogle(credentialResponse.credential);
    setIsSubmitting(false);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(res.error || 'Google authentication failed.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold mx-auto shadow-md shadow-blue-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Sign In to <span className="text-blue-600 dark:text-blue-400">Pacto.ai</span>
            </h2>
            <p className="text-xs text-slate-500">
              Contract Intelligence & Business Decision Platform
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Google Login */}
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setErrorMsg('Google Sign-In origin error. Use 1-click persona buttons below.')}
                theme="outline"
                shape="pill"
                width="320"
              />
            </div>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-mono text-slate-400 uppercase tracking-wider absolute">
                or sign in with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Work Email</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="victoria.chen@pacto.io"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Workspace'}</span>
            </button>
          </form>

          {/* Quick Demo Persona Shortcuts */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block text-center">
              1-Click Demo Persona Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickPersona('victoria.chen@pacto.io', 'user', 'Victoria Chen')}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-500 text-left transition-all"
              >
                <div className="flex items-center space-x-1 text-xs font-bold text-slate-900 dark:text-white">
                  <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>General Counsel</span>
                </div>
                <span className="text-[10px] text-slate-500 block">User Persona</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickPersona('admin@pacto.io', 'admin', 'David Sterling (Admin)')}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-rose-500 text-left transition-all"
              >
                <div className="flex items-center space-x-1 text-xs font-bold text-slate-900 dark:text-white">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  <span>System Admin</span>
                </div>
                <span className="text-[10px] text-slate-500 block">Admin Control Panel</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
