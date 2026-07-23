import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';
import AISearchModal from '../components/AISearchModal';
import { 
  LayoutDashboard, FileText, Sparkles, SlidersHorizontal, FileCode, BookOpen, 
  GitCompare, ShieldCheck, CheckSquare, Clock, BarChart3, Download, Users, 
  Settings, Search, Lock, LogOut, ChevronDown, Bell, Building2 
} from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout, activeWorkspace, setActiveWorkspace } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Protect Dashboard route
  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pacto Enterprise Authentication Required</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Please sign in to access Pacto Contract Intelligence & Business Decision Engine.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all"
          >
            Sign In to Enterprise Workspace
          </button>
        </div>
      </div>
    );
  }

  const navSections = [
    {
      group: 'Core Decision Apps',
      items: [
        { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Contracts Repository', path: '/dashboard/contracts', icon: FileText },
        { label: 'AI Review & Health', path: '/dashboard/ai-review', icon: Sparkles, badge: 'AI' },
        { label: 'BI & P&L Simulator', path: '/dashboard/bi-simulator', icon: SlidersHorizontal, badge: 'Core' },
      ]
    },
    {
      group: 'Contract Lifecycle',
      items: [
        { label: 'AI Contract Builder', path: '/dashboard/builder', icon: FileCode },
        { label: 'Clause Intelligence', path: '/dashboard/clause-library', icon: BookOpen },
        { label: 'Negotiation Center', path: '/dashboard/negotiation', icon: GitCompare },
        { label: 'Company Playbook', path: '/dashboard/playbook', icon: ShieldCheck },
      ]
    },
    {
      group: 'Operations & Insights',
      items: [
        { label: 'Obligation Tracker', path: '/dashboard/obligations', icon: CheckSquare },
        { label: 'Renewal Intelligence', path: '/dashboard/renewals', icon: Clock },
        { label: 'Analytics Engine', path: '/dashboard/analytics', icon: BarChart3 },
        { label: 'Executive Reports', path: '/dashboard/reports', icon: Download },
      ]
    },
    {
      group: 'Administration',
      items: [
        { label: 'Team Workspace', path: '/dashboard/team', icon: Users },
        { label: 'Workspace Settings', path: '/dashboard/settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 glass-panel border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col justify-between p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="space-y-6">
          
          {/* Workspace Dropdown */}
          <div className="relative">
            <button
              onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-left hover:border-blue-500/40 transition-all group"
            >
              <div className="flex items-center space-x-2.5 truncate">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {activeWorkspace}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Enterprise Plan</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </button>

            {workspaceMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 space-y-1">
                {['Pacto Global Inc. (HQ)', 'Pacto EMEA (London)', 'Pacto APAC (Singapore)'].map((ws) => (
                  <button
                    key={ws}
                    onClick={() => {
                      setActiveWorkspace(ws);
                      setWorkspaceMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activeWorkspace === ws ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {ws}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Groups */}
          <div className="space-y-4">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {section.group}
                </span>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        active
                          ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-1.5 py-0.2 text-[9px] font-mono rounded ${
                          active ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

        </div>

        {/* User Profile Card & Sign Out */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center space-x-2.5 px-2 py-1">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-300 dark:border-slate-700"
            />
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user.name}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.role}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Workspace Top Header Bar */}
        <header className="sticky top-16 z-30 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between">
          {/* AI Search Bar Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full max-w-md px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-left flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 hover:border-blue-500/40 hover:bg-slate-100/90 transition-all group"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="truncate">Ask Pacto AI... (e.g., "Find contracts expiring this month")</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 text-slate-400 rounded border border-slate-200 dark:border-slate-600">
              ⌘K
            </kbd>
          </button>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500"></span>
            </button>
            <Link
              to="/dashboard/builder"
              className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all items-center space-x-1"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>New Contract</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* AI Natural Language Search Modal */}
      <AISearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
