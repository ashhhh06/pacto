import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useApp();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center p-2 rounded-lg border transition-all duration-200 ${
        theme === 'dark'
          ? 'bg-slate-800/80 border-slate-700/80 text-amber-400 hover:border-blue-500/50 hover:bg-slate-800'
          : 'bg-white border-slate-200 text-slate-700 hover:border-blue-500/50 hover:bg-slate-50'
      } ${className}`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:scale-110" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-transform duration-200 hover:scale-110" />
      )}
    </button>
  );
}
