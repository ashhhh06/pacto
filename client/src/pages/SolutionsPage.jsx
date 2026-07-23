import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, DollarSign, Users, Briefcase, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SolutionsPage() {
  const SOLUTIONS = [
    { title: 'For Enterprise Legal Teams', icon: Shield, desc: 'Detect compliance risks, enforce company playbook rules, and accelerate contract review turnaround time by 80%.' },
    { title: 'For Procurement Departments', icon: Briefcase, desc: 'Eliminate vendor auto-renewal traps, negotiate strict liability caps, and manage vendor SLA obligations.' },
    { title: 'For Finance & Operations', icon: DollarSign, desc: 'Simulate discount impact on net margin %, model quarterly cash flow timelines, and forecast ARR.' },
    { title: 'For Sales & Revenue Teams', icon: Users, desc: 'Close deals faster using AI Contract Builder templates while protecting margin targets.' },
    { title: 'For Law Firms & Consultants', icon: Building2, desc: 'Serve client contract portfolios with deep AI clause analysis, risk gauges, and executive board decks.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
          Role & Industry Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Tailored Contract Intelligence for Every Business Function
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          From legal compliance to financial profitability, discover how Pacto drives decision-making.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SOLUTIONS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="glass-panel rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{s.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
