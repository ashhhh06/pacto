import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Sparkles, ArrowRight, CheckCircle2, Sliders, FileText, 
  GitCompare, BarChart3, Lock, Users, Zap, Check, TrendingUp, AlertTriangle, Play, HelpCircle
} from 'lucide-react';
import RiskGauge from '../components/RiskGauge';

export default function LandingPage() {
  // Interactive Simulator State for Landing Page Demo (Feature 3 preview)
  const [discount, setDiscount] = useState(10);
  const [paymentTermsDays, setPaymentTermsDays] = useState(30);

  const baseContractValue = 1200000;
  const calculatedRevenue = Math.round(baseContractValue * (1 - discount / 100));
  const estimatedInfraCost = 450000;
  const calculatedProfit = calculatedRevenue - estimatedInfraCost;
  const calculatedMargin = ((calculatedProfit / calculatedRevenue) * 100).toFixed(1);

  // Interactive Builder Demo State (Feature 4 preview)
  const [selectedType, setSelectedType] = useState('MSA');
  const [selectedIpOption, setSelectedIpOption] = useState('Company');

  return (
    <div className="space-y-24 pb-20">
      
      {/* SECTION 1: HERO */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Enterprise Contract Intelligence OS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Beyond Contracts.<br />
              <span className="gradient-text-blue">Business Intelligence</span> in Every Agreement.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Create smarter contracts, analyze legal and financial risks, negotiate better deals, monitor obligations, and maximize contract value using AI.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Link
                to="/register"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 text-blue-500 fill-blue-500" />
                <span>Book Live Demo</span>
              </Link>
            </div>

            <div className="flex items-center space-x-6 text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>SOC 2 & GDPR Ready</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Animated Interactive Dashboard Preview */}
          <div className="lg:col-span-6">
            <div className="glass-panel rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-2xl space-y-4 bg-white/90 dark:bg-slate-900/90 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full filter blur-2xl pointer-events-none"></div>

              {/* Top Mockup Control Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono font-semibold text-slate-500 ml-2">Pacto OS v2.4 • Active Session</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full font-bold">
                  AI Analyzing Live
                </span>
              </div>

              {/* Mockup Dashboard Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium">Contract Value</span>
                  <p className="text-xl font-bold font-mono text-slate-900 dark:text-white">$1,450,000</p>
                  <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +18.4% commercial gain
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium">Profit Margin</span>
                  <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">35.8%</p>
                  <span className="text-[10px] text-slate-400">P&L Simulator Verified</span>
                </div>
              </div>

              {/* Mock Risk Gauge & Executive Insights */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="text-xs font-bold">Pacto AI Intelligence Summary</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">92/100 Safe</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Master Services Agreement with Acme Corp is legally compliant. IP rights retained by Pacto. Net 30 payment schedule produces $580,000 projected net profit."
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: TRUSTED BY COMPANIES */}
      <section className="border-y border-slate-200 dark:border-slate-800 py-10 bg-slate-50/50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Trusted by Enterprise Legal, Finance & Procurement Leaders Globally
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all font-mono font-bold text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            <span>ACME CORP</span>
            <span>CLOUDSCALE</span>
            <span>BIOHEALTH</span>
            <span>APEX CAPITAL</span>
            <span>NEXUS TECH</span>
            <span>QUANTUM LOGISTICS</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE PROBLEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            The Enterprise Challenge
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Traditional CLMs are Document Storage Lockers.<br />They Don't Help You Make Business Decisions.
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Most software simply stores PDF files and highlights legalese. But executive decision-makers need to know commercial profitability, hidden financial exposure, and strategic impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Hidden Financial Risk</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Uncapped liability clauses and vague indemnity language expose companies to catastrophic financial losses without legal teams realizing it.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5 rotate-180" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Uncalculated Margins</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sales teams offer heavy discounts or Net 90 payment terms without simulating the impact on profit margin, ARR, and cash flow timelines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Forgotten Obligations</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Renewals auto-trigger because non-renewal notice windows are buried on page 42 of legacy vendor agreements.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY PACTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-blue-600 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
              The Contract Intelligence Paradigm Shift
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Why Legal + Financial Intelligence Changes Everything
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Pacto connects your legal policies with commercial revenue drivers. It answers the questions executive leadership actually cares about before signing any agreement.
            </p>
            <div className="space-y-3 text-xs font-medium text-blue-50">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Is this contract legally safe and aligned with company policy?</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Is this deal commercially profitable and what is the net margin?</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>What happens to profit if we agree to a 10% discount or Net 60 terms?</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 text-slate-100 p-6 rounded-2xl border border-white/10 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">Pacto Executive Decision Matrix</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded bg-slate-800/80">
                <span className="text-slate-400">Legal Safety Score</span>
                <span className="font-mono font-bold text-emerald-400">92/100 (Pass)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-800/80">
                <span className="text-slate-400">Projected Net Profit</span>
                <span className="font-mono font-bold text-blue-400">$580,000</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-slate-800/80">
                <span className="text-slate-400">Company Playbook Match</span>
                <span className="font-mono font-bold text-emerald-400">100% Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7: LIVE DEMOS (BUILDER & P&L SIMULATOR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* P&L SIMULATOR DEMO (Feature 3) */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-8 bg-white dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Feature 3 Showcase</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Interactive Profit & Loss Deal Simulator</h3>
              <p className="text-xs text-slate-500">Test variable changes live before signing any agreement.</p>
            </div>
            <Link to="/dashboard/bi-simulator" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              <span>Open Full Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <span>Client Discount Offered</span>
                  <span className="font-mono font-bold text-blue-600">{discount}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={discount} 
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <span>Payment Terms Window</span>
                  <span className="font-mono font-bold text-blue-600">Net {paymentTermsDays} Days</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[30, 60, 90].map((d) => (
                    <button
                      key={d}
                      onClick={() => setPaymentTermsDays(d)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        paymentTermsDays === d ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      Net {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Live Recalculated Output */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center space-y-1">
                <span className="text-xs font-medium text-slate-500">Recalculated Revenue</span>
                <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                  ${calculatedRevenue.toLocaleString()}
                </p>
                <span className="text-[10px] text-slate-400">Base: $1,200,000</span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
                <span className="text-xs font-medium text-slate-500">Estimated Net Profit</span>
                <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  ${calculatedProfit.toLocaleString()}
                </p>
                <span className="text-[10px] text-emerald-500 font-semibold">Infra Cost: $450k</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 text-white text-center space-y-1 flex flex-col justify-center">
                <span className="text-xs font-medium text-slate-400">Net Profit Margin</span>
                <p className="text-2xl font-bold font-mono text-blue-400">
                  {calculatedMargin}%
                </p>
                <span className="text-[10px] text-slate-400">Commercial Verdict: Accept</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION 10: SECURITY & COMPLIANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 space-y-8 bg-slate-900 text-white">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Enterprise Security Standard</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">Bank-Grade Encryption & Confidentiality</h3>
            <p className="text-xs text-slate-400">Your sensitive contract data is protected under strict zero-retention policies.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <Shield className="w-6 h-6 text-blue-400 mx-auto" />
              <h4 className="text-xs font-bold">SOC 2 Type II</h4>
              <p className="text-[11px] text-slate-400">Certified operational controls</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <Lock className="w-6 h-6 text-emerald-400 mx-auto" />
              <h4 className="text-xs font-bold">AES-256 Bit</h4>
              <p className="text-[11px] text-slate-400">At-rest & in-transit encryption</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <Users className="w-6 h-6 text-amber-400 mx-auto" />
              <h4 className="text-xs font-bold">SAML & Google SSO</h4>
              <p className="text-[11px] text-slate-400">Role-based access control</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-cyan-400 mx-auto" />
              <h4 className="text-xs font-bold">GDPR & DPDP</h4>
              <p className="text-[11px] text-slate-400">Data sovereignty guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: FINAL CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Ready to Transform Every Agreement into a High-Profit Commercial Asset?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Join leading legal, finance, and procurement teams using Pacto to create, analyze, negotiate, and optimize enterprise contracts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Link
            to="/register"
            className="px-8 py-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center space-x-2"
          >
            <span>Start Your 14-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 rounded-xl font-bold text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center"
          >
            Schedule Enterprise Demo
          </Link>
        </div>
      </section>

    </div>
  );
}
