import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest">404 Error • Page Not Found</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Looking for a Contract Page?</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page or workspace path you requested does not exist or has been moved. Return to your command center dashboard.
          </p>
        </div>

        <div className="pt-2 flex justify-center space-x-3">
          <Link
            to="/dashboard"
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center space-x-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
