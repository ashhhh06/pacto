import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';
import AISearchModal from '../components/AISearchModal';
import { 
  LayoutDashboard, FileText, Sparkles, SlidersHorizontal, FileCode, BookOpen, 
  GitCompare, ShieldCheck, CheckSquare, Clock, BarChart3, Download, Users, 
  Settings, Search, Lock, LogOut, ChevronDown, Bell, Building2, Check
} from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout, notifications, markNotificationRead } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

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
            Please sign in to access Pacto Contract Intelligence & Enterprise Workspace.
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

  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 glass-panel border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col justify-between p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="space-y-6">
          
          {/* Organization & Workspace Badge */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center space-x-2.5 truncate">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm shadow-blue-500/20">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {user.organizationName || 'Enterprise Org'}
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono truncate">
                {user.workspaceName || 'Main Workspace'}
              </span>
            </div>
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
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=ffffff`}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700"
            />
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user.name}</span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold truncate">{user.role}</span>
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

          {/* Quick Actions & Notifications Popover */}
          <div className="flex items-center space-x-3 relative">
            <button
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              )}
            </button>

            {showNotificationsDropdown && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Organization Notifications</h4>
                  <span className="text-[10px] font-mono text-blue-500">{notifications.length} Total</span>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">No notifications yet.</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n._id} className={`p-2.5 rounded-xl border text-xs space-y-1 ${n.read ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-500' : 'bg-blue-500/10 border-blue-500/20 text-slate-900 dark:text-slate-100 font-semibold'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{n.title}</span>
                          {!n.read && (
                            <button onClick={() => markNotificationRead(n._id)} className="text-blue-500 hover:text-blue-700">
                              <Check className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] font-normal">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

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
