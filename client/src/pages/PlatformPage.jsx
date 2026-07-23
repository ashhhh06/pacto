import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, SlidersHorizontal, FileText, CheckCircle2, ArrowRight, Lock, Database } from 'lucide-react';

export default function PlatformPage() {
  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Platform Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
          Pacto Operating System Architecture
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Intelligent Decision Support for <span className="gradient-text-blue">Enterprise Contracts</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Pacto converts static PDF and DOCX agreements into structured legal and commercial intelligence. Combine legal risk detection with financial profit modeling, obligation tracking, and executive decision support.
        </p>
      </div>

      {/* 4-Step Pipeline */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-8 bg-white dark:bg-slate-900 shadow-xl">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">End-to-End Contract Intelligence Pipeline</h2>
          <p className="text-xs text-slate-500">How Pacto processes legal text from ingestion to executive P&L decision support.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border space-y-2 text-center">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold font-mono text-xs flex items-center justify-center mx-auto">01</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">AI Document Parsing</h4>
            <p className="text-xs text-slate-500">Extracts 14 key data points: Parties, Value, Dates, Liability, IP Rights, Penalties.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border space-y-2 text-center">
            <span className="w-8 h-8 rounded-full bg-cyan-500 text-white font-bold font-mono text-xs flex items-center justify-center mx-auto">02</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Commercial P&L Simulation</h4>
            <p className="text-xs text-slate-500">Models discount percent, payment terms, net profit margin, and cash flow timeline.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border space-y-2 text-center">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold font-mono text-xs flex items-center justify-center mx-auto">03</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Playbook Compliance</h4>
            <p className="text-xs text-slate-500">Verifies mandatory NDA, liability caps, and company policy match rules.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border space-y-2 text-center">
            <span className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold font-mono text-xs flex items-center justify-center mx-auto">04</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Obligation & Renewal Radar</h4>
            <p className="text-xs text-slate-500">Converts obligations into tasks and monitors auto-renewal notice windows.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
