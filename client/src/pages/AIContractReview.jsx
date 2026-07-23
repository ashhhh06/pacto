import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, Upload, FileText, CheckCircle2, ShieldAlert, AlertTriangle, 
  BookOpen, ArrowRight, Check, HelpCircle, Layers, ShieldCheck
} from 'lucide-react';
import RiskGauge from '../components/RiskGauge';

export default function AIContractReview() {
  const { contracts } = useApp();
  const [selectedContractId, setSelectedContractId] = useState(contracts[0]?.id || 'ctr-101');
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'clauses' | 'risks' | 'missing'

  const currentContract = contracts.find(c => c.id === selectedContractId) || contracts[0];

  const handleSimulatedFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert(`Pacto AI successfully analyzed "${file.name}"! 14 key data points extracted.`);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Feature 1 Showcase • AI Legal Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            AI Contract Review & Health Score
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Upload PDF or DOCX agreements for instant extraction of parties, dates, risks, missing clauses, and health scores.
          </p>
        </div>

        {/* Upload Button */}
        <label className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-2 cursor-pointer self-start sm:self-auto">
          <Upload className="w-4 h-4" />
          <span>Upload PDF / DOCX</span>
          <input type="file" accept=".pdf,.docx,.doc" onChange={handleSimulatedFileUpload} className="hidden" />
        </label>
      </div>

      {/* Uploading Status Overlay */}
      {isUploading && (
        <div className="p-8 rounded-2xl glass-panel text-center space-y-3">
          <Sparkles className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Extracting 14 contractual vectors: Parties, Effective Date, Liability, IP Rights, Penalties...
          </p>
        </div>
      )}

      {/* Contract Selector Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{currentContract.title}</h3>
            <p className="text-xs text-slate-500">{currentContract.client} • Category: {currentContract.category}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Select Agreement:</span>
            <select
              value={selectedContractId}
              onChange={(e) => setSelectedContractId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            >
              {contracts.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contract Scores & Data Extracted Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Risk & Health Score Gauge Cards (4 Cols) */}
        <div className="md:col-span-4 glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-center">
              Contract Intelligence Scorecard
            </h4>
            <div className="flex justify-around items-center pt-2">
              <RiskGauge score={currentContract.healthScore} label="Health Score" size="lg" />
              <RiskGauge score={currentContract.riskScore} label="Legal Risk Score" size="lg" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Contract Type</span>
              <span className="font-bold text-slate-900 dark:text-white">{currentContract.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Effective Date</span>
              <span className="font-mono">{currentContract.effectiveDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Expiry Date</span>
              <span className="font-mono">{currentContract.expiryDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Governing Law</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{currentContract.governingLaw}</span>
            </div>
          </div>
        </div>

        {/* 14 Data Points Extracted Table (8 Cols) */}
        <div className="md:col-span-8 glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              14 AI Extracted Data Points
            </h4>
            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
              VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">1. Parties</span>
              <p className="font-bold text-slate-900 dark:text-white truncate">{currentContract.parties?.client || currentContract.client}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">2. Contract Value</span>
              <p className="font-bold font-mono text-blue-600 dark:text-blue-400">${currentContract.value?.toLocaleString()}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">3. Payment Terms</span>
              <p className="font-bold text-slate-900 dark:text-white">{currentContract.paymentTerms}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">4. Notice Period</span>
              <p className="font-bold text-slate-900 dark:text-white">{currentContract.noticePeriodDays} Days</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">5. Auto Renewal</span>
              <p className="font-bold text-emerald-500">{currentContract.autoRenewal ? 'Yes (Enabled)' : 'No'}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">6. Net Profit Margin</span>
              <p className="font-bold font-mono text-cyan-500">{currentContract.profitMargin}%</p>
            </div>
          </div>
        </div>

      </div>

      {/* Tabs Breakdown Section */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-6 text-xs font-bold">
          {['summary', 'clauses', 'risks', 'missing'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-3 capitalize transition-all border-b-2 ${
                activeTab === t
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t === 'summary' ? 'Executive Summary' : t === 'clauses' ? 'Clause Breakdown' : t === 'risks' ? 'Legal Risk Score' : 'Missing Clauses'}
            </button>
          ))}
        </div>

        {/* Tab Content: Summary */}
        {activeTab === 'summary' && (
          <div className="glass-panel rounded-2xl p-6 bg-white dark:bg-slate-900 space-y-3">
            <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              AI Executive Summary
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              This {currentContract.type} agreement with {currentContract.client} establishes a total committed value of ${currentContract.value?.toLocaleString()}. 
              Pacto AI identified <strong>{currentContract.clauses?.length || 0} core clauses</strong> with an overall safety score of <strong>{currentContract.healthScore}/100</strong>.
            </p>
          </div>
        )}

        {/* Tab Content: Clauses */}
        {activeTab === 'clauses' && (
          <div className="space-y-3">
            {currentContract.clauses?.map((cl) => (
              <div key={cl.id} className="p-4 rounded-2xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{cl.name}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                    cl.riskLevel === 'High' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  }`}>
                    Risk: {cl.riskLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  "{cl.text}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Missing Clauses */}
        {activeTab === 'missing' && (
          <div className="glass-panel rounded-2xl p-6 bg-white dark:bg-slate-900 space-y-3">
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              Missing Mandatory Clauses Flagged by Playbook
            </h4>
            {currentContract.missingClauses?.length === 0 ? (
              <p className="text-xs text-emerald-500 font-semibold">Zero missing clauses! Complete policy match.</p>
            ) : (
              <div className="space-y-2">
                {currentContract.missingClauses?.map((m, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
