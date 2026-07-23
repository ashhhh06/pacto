import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';
import { 
  ShieldAlert, Users, FileText, Cpu, DollarSign, Mail, 
  BarChart3, LayoutDashboard, Lock, ArrowLeft, LogOut
} from 'lucide-react';

export default function AdminLayout() {
  const { user } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  // Protect Admin route
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Privileges Required</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You must be logged in as an Administrator (e.g. admin@pacto.io) to access the system platform control panel.
          </p>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                // Quick switch to admin persona
                localStorage.setItem('pacto-user', JSON.stringify({
                  id: 'usr-admin-1',
                  name: 'David Sterling (System Admin)',
                  email: 'admin@pacto.io',
                  role: 'admin',
                  organization: 'Pacto Systems Global'
                }));
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all"
            >
              Switch to Admin Persona
            </button>
            <Link to="/" className="text-xs text-slate-500 hover:underline">Return to Public Homepage</Link>
          </div>
        </div>
      </div>
    );
  }

  const adminNav = [
    { label: 'Admin Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'User Directory', path: '/admin/users', icon: Users },
    { label: 'Standard Templates', path: '/admin/templates', icon: FileText },
    { label: 'AI Token Usage', path: '/admin/ai-usage', icon: Cpu },
    { label: 'SaaS Subscriptions', path: '/admin/subscriptions', icon: DollarSign },
    { label: 'Contact Requests', path: '/admin/contact-requests', icon: Mail },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col justify-between p-4 sticky top-0 h-screen">
        <div className="space-y-6">
          
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center font-bold text-white">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-white">Pacto Admin</span>
              <span className="text-[10px] font-mono text-rose-400">System Platform OS</span>
            </div>
          </div>

          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            to="/dashboard"
            className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to User App</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

    </div>
  );
}
