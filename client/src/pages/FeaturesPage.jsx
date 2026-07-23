import React, { useState } from 'react';
import { 
  Sparkles, SlidersHorizontal, FileCode, BookOpen, GitCompare, 
  ShieldCheck, CheckSquare, Clock, BarChart3, Download, Search, 
  ArrowRight, CheckCircle2, ShieldAlert, DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: 'f1',
      title: 'AI Contract Review',
      tagline: 'Upload PDF or DOCX and extract 14 key data points instantly',
      icon: Sparkles,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      description: 'Automatically parses contract agreements to extract Parties, Effective & Expiry dates, Deliverables, Payments, Late Penalties, Confidentiality, Governing Law, Termination terms, and Risk Scores.',
      highlights: ['Executive Summary Generation', 'Clause-by-Clause Risk Heatmap', 'Missing Mandatory Clauses Alert', 'Contract Health Score Dial']
    },
    {
      id: 'f2',
      title: 'Business Intelligence Engine',
      tagline: 'Calculate true commercial impact beyond legal language',
      icon: DollarSign,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      description: 'Pacto extracts financial metrics: Contract Value, Annual Recurring Revenue (ARR), Operational Cost, Discounts, Taxes, Payment Schedules, Milestones, and Late Fees to forecast deal profitability.',
      highlights: ['Expected Revenue & Net Profit', 'Gross & Operating Profit Margin %', 'Cash Flow Quarter-by-Quarter', 'Commercial Payment Risk Score']
    },
    {
      id: 'f3',
      title: 'Profit & Loss Simulator',
      tagline: 'Test commercial variables before signing',
      icon: SlidersHorizontal,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      description: 'Interactive deal modeling engine: change discounts, payment term days (Net 30/60/90), or liability caps to see real-time recalculation of cash flow, net profit, and ROI.',
      highlights: ['Real-Time Margin Recalculation', 'Scenario A vs Scenario B Modeling', 'AI Commercial Deal Verdict', 'Cash Flow Impact Forecast']
    },
    {
      id: 'f4',
      title: 'AI Contract Builder',
      tagline: 'Generate customized enterprise drafts through a 3-step wizard',
      icon: FileCode,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      description: 'Select contract type (MSA, NDA, SaaS, SOW, Vendor), input commercial details, choose legal preferences (Payment terms, IP Ownership, Dispute Resolution, GDPR/HIPAA), and generate a complete legal draft in seconds.',
      highlights: ['10+ Enterprise Contract Types', 'Configurable Compliance Checkboxes', 'Instant AI Draft Generation', 'Export to DOCX / PDF']
    },
    {
      id: 'f5',
      title: 'Clause Intelligence',
      tagline: 'Every clause is clickable with plain English explanations',
      icon: BookOpen,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      description: 'Click any clause to view plain English summary, legal intent, risk level, industry standards, fallback alternative wording, and negotiation battlecard tips.',
      highlights: ['Plain English Summaries', 'Industry Standard Benchmarks', 'Alternative Clause Suggestions', 'Company Policy Match Status']
    },
    {
      id: 'f6',
      title: 'Negotiation Center',
      tagline: 'Compare two contract versions with visual diff engine',
      icon: GitCompare,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      description: 'Upload Contract V1 vs V2 to highlight added, removed, and modified clauses, financial variance, liability shifts, and generate AI-driven counter-proposals.',
      highlights: ['Dual-Pane Text Diff Engine', 'Financial Difference Counter', 'Who Benefits AI Analysis', 'Suggested Counter-Response Draft']
    },
    {
      id: 'f7',
      title: 'Company Playbook Engine',
      tagline: 'Enforce enterprise contracting rules automatically',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      description: 'Define organizational rules (e.g. Always include NDA, Never accept unlimited liability, Payment <= Net 45) and run automated compliance audits across uploaded contracts.',
      highlights: ['Custom Rule Builder', 'Automated Non-Compliance Alerts', 'Mandatory vs Standard Severity', 'Playbook Compliance Score']
    },
    {
      id: 'f8',
      title: 'Obligation Tracker',
      tagline: 'Convert contractual commitments into actionable tasks',
      icon: CheckSquare,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      description: 'Automatically extract obligations from contract text and convert them into assigned tasks with owners, due dates, priority levels, and reminder notifications.',
      highlights: ['Automated Task Extraction', 'Owner & Due Date Assignment', 'Status Tracking (Pending/Done)', 'Automated Reminder Alerts']
    },
    {
      id: 'f9',
      title: 'Renewal Intelligence',
      tagline: 'Never miss an opt-out window or auto-renewal date',
      icon: Clock,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      description: 'Detects notice periods, cancellation windows, and auto-renewal dates to forecast future ARR impact and alert legal/procurement teams well before deadlines.',
      highlights: ['Notice Window Countdown', 'Auto-Renewal Opt-Out Alerts', 'Recurring Revenue Forecast', 'Notice Deadline Heatmap']
    },
    {
      id: 'f10',
      title: 'AI Natural Language Search',
      tagline: 'Ask complex portfolio questions in plain English',
      icon: Search,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      description: 'Query your entire contract database using natural language: "Find contracts expiring this month", "Which vendors own our IP?", or "Which contracts have unlimited liability?"',
      highlights: ['Vector Search Query Engine', 'Instant AI Executive Summaries', 'Direct Contract Deep Links', 'Risk & Financial Filtering']
    },
    {
      id: 'f11',
      title: 'Analytics Dashboard',
      tagline: 'Enterprise commercial KPIs and multi-chart breakdown',
      icon: BarChart3,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      description: 'Real-time charts for Revenue Trends, Risk Distribution, Contract Type allocation, Departmental spending, and Monthly contracting velocity.',
      highlights: ['Portfolio ARR & Profit Totals', 'Risk Distribution Chart', 'Departmental Exposure', 'Monthly Activity Velocity']
    },
    {
      id: 'f12',
      title: 'Executive Reports Generator',
      tagline: 'Downloadable board deck & compliance reports',
      icon: Download,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      description: 'Generate polished board-level executive reports summarizing financial deal value, legal risk score, compliance audit, and renewal forecasts.',
      highlights: ['Financial Exposure Summary', 'Risk & Compliance Matrix', 'Renewal Timeline Schedule', 'Print & Export Ready']
    }
  ];

  const currentFeature = features[activeTab];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          Complete Feature Suite
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          12 Core Capabilities of Pacto Contract Intelligence
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Explore how Pacto turns static contract documents into an intelligent, high-profit business decision platform.
        </p>
      </div>

      {/* Interactive Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Feature Tabs */}
        <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-2">
          {features.map((f, idx) => {
            const Icon = f.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={f.id}
                onClick={() => setActiveTab(idx)}
                className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center space-x-3 group ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500/40'
                }`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20 text-white' : f.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold truncate">{f.title}</span>
                  <span className={`text-[10px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    Feature #{idx + 1}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Feature Showcase Card */}
        <div className="lg:col-span-8">
          <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl ${currentFeature.color}`}>
                <currentFeature.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase">
                  Feature #{activeTab + 1}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {currentFeature.title}
                </h2>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {currentFeature.tagline}
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {currentFeature.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Key Technical Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentFeature.highlights.map((h, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5"
              >
                <span>Try Feature in App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
