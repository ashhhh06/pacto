import React from 'react';
import { ShieldCheck, Target, Eye, Users, Lock, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const leadership = [
    { name: 'David Sterling', role: 'Chief Executive Officer & Founder', bio: 'Former Enterprise Legal Counsel with 15+ years in CLM automation and SaaS procurement.' },
    { name: 'Dr. Elena Rostova', role: 'Head of Artificial Intelligence', bio: 'PhD in NLP & Information Extraction. Spearheaded legal LLM fine-tuning and clause parser engines.' },
    { name: 'Marcus Vance', role: 'VP of Enterprise Security & Compliance', bio: 'Former CISSP auditor leading Pacto’s SOC 2 Type II and ISO 27001 zero-trust data architecture.' },
    { name: 'Aashi Sharma', role: 'Lead Product Architect', bio: 'Specialist in high-throughput React SPA systems and MongoDB Atlas database schema optimization.' },
  ];

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-500 uppercase">
          About Pacto Systems
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          The Intelligent Operating System for <span className="gradient-text-emerald">Enterprise Contracts</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Transforming static legal documents into structured, actionable business intelligence for modern enterprises.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Vision Card */}
        <div className="p-8 rounded-2xl glass-panel space-y-4 border-l-4 border-emerald-500">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-bold text-emerald-500 uppercase">OUR VISION</span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">The Operating System for Legal Intelligence</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To become the intelligent operating system for enterprise contracts by transforming static legal documents into actionable business intelligence that powers every legal, procurement, and compliance decision.
          </p>
        </div>

        {/* Mission Card */}
        <div className="p-8 rounded-2xl glass-panel space-y-4 border-l-4 border-amber-500">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-bold text-amber-500 uppercase">OUR MISSION</span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Accelerating Enterprise Decisions</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Help organizations reduce legal risks, accelerate contract negotiations, improve regulatory compliance, and make smarter procurement decisions using AI-powered contract intelligence.
          </p>
        </div>

      </div>

      {/* Leadership Team */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pacto Leadership Team</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Engineers, legal experts, and AI researchers committed to contract intelligence innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((member, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-panel glass-card-hover space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-slate-950 font-extrabold text-lg">
                {member.name.charAt(0)}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{member.name}</h4>
                <span className="text-[11px] font-mono text-emerald-500 block">{member.role}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Commitment Banner */}
      <div className="p-8 rounded-2xl glass-panel bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase">
            <Lock className="w-4 h-4" />
            <span>Zero-Trust Enterprise Security</span>
          </div>
          <h3 className="text-xl font-bold">Your Contract Data Remains Strictly Private</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Pacto operates with zero customer data retention for AI model training. All customer contract uploads are processed in isolated memory and stored encrypted in MongoDB Atlas.
          </p>
        </div>
        <Link to="/contact" className="px-6 py-3 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400 whitespace-nowrap">
          Read Security Commitments
        </Link>
      </div>

    </div>
  );
}
