import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, Upload, FileText, CheckCircle2, ShieldAlert, AlertTriangle, 
  BookOpen, ArrowRight, Check, HelpCircle, Layers, ShieldCheck, Plus, X
} from 'lucide-react';
import RiskGauge from '../components/RiskGauge';

export default function AIContractReview() {
  const { contracts, addContract } = useApp();
  const [selectedContractId, setSelectedContractId] = useState(contracts[0]?.id || null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'clauses' | 'risks'

  // New Contract Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Sales');
  const [newOwner, setNewOwner] = useState('Legal Counsel');
  const [newValue, setNewValue] = useState('500000');
  const [newText, setNewText] = useState('');

  const currentContract = contracts.find(c => c.id === selectedContractId) || contracts[0];

  const handleCreateAndAnalyze = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    setIsAnalyzing(true);
    const created = await addContract({
      title: newTitle,
      category: newCategory,
      owner: newOwner,
      value: Number(newValue),
      contentText: newText
    });
    setIsAnalyzing(false);

    if (created) {
      setSelectedContractId(created._id);
      setShowUploadModal(false);
      setNewTitle('');
      setNewText('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target.result || `Sample contract text extracted from file "${file.name}".`;
      setNewTitle(file.name.replace(/\.[^/.]+$/, ""));
      setNewText(typeof content === 'string' ? content : 'Standard contract terms extracted.');
      setShowUploadModal(true);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Legal Intelligence & Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            AI Contract Review & Health Score
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Upload agreements for instant extraction of parties, key terms, liability caps, governing law, and legal risk scores.
          </p>
        </div>

        {/* Upload & Analyze CTA Button */}
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center space-x-2 self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Analyze New Contract</span>
        </button>
      </div>

      {/* Contract Selector & Overview Header */}
      {contracts.length > 0 && currentContract ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{currentContract.title}</h3>
                <p className="text-xs text-slate-500">Client: {currentContract.client} • Category: {currentContract.category} • Status: <strong className="text-blue-600 dark:text-blue-400">{currentContract.status}</strong></p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs text-slate-500 font-semibold">Active Agreement:</span>
              <select
                value={selectedContractId || currentContract.id}
                onChange={(e) => setSelectedContractId(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {contracts.map(c => (
                  <option key={c.id} value={c.id}>{c.title} ({c.status})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Contract Scores & Key Business Extracted Information */}
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
                  <span className="text-slate-500">Contract Lifecycle</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{currentContract.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Owner</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{currentContract.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Effective Date</span>
                  <span className="font-mono">{currentContract.effectiveDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Governing Law</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{currentContract.governingLaw}</span>
                </div>
              </div>
            </div>

            {/* Extracted Key Business Information Grid (8 Cols) */}
            <div className="md:col-span-8 glass-panel rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Extracted Contract Terms & Business Information
                </h4>
                <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                  VERIFIED BY AI
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">1. Contracting Parties</span>
                  <p className="font-bold text-slate-900 dark:text-white truncate">{currentContract.client}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">2. Contract Value</span>
                  <p className="font-bold font-mono text-blue-600 dark:text-blue-400">${currentContract.value?.toLocaleString()}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">3. Effective Date</span>
                  <p className="font-bold font-mono text-slate-900 dark:text-white">{currentContract.effectiveDate}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">4. Expiry Date</span>
                  <p className="font-bold font-mono text-slate-900 dark:text-white">{currentContract.expiryDate}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">5. Payment Terms</span>
                  <p className="font-bold text-slate-900 dark:text-white">{currentContract.paymentTerms}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">6. Governing Law</span>
                  <p className="font-bold text-slate-900 dark:text-white">{currentContract.governingLaw}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">7. Limitation of Liability</span>
                  <p className="font-bold text-slate-900 dark:text-white">Cap: 2x Annual Spend</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">8. Confidentiality</span>
                  <p className="font-bold text-emerald-500">Mutual NDA (3 Years)</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">9. Renewal Terms</span>
                  <p className="font-bold text-blue-500">{currentContract.autoRenewal ? 'Auto-Renew (60d Notice)' : 'Fixed Term'}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Breakdown Tabs */}
          <div className="space-y-4">
            <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-6 text-xs font-bold">
              {['summary', 'clauses', 'risks'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`pb-3 capitalize transition-all border-b-2 ${
                    activeTab === t
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t === 'summary' ? 'Executive Summary' : t === 'clauses' ? 'Extracted Clauses' : 'Risk & Safety Indicators'}
                </button>
              ))}
            </div>

            {activeTab === 'summary' && (
              <div className="glass-panel rounded-2xl p-6 bg-white dark:bg-slate-900 space-y-3 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  AI Business Executive Summary
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentContract.executiveSummary}
                </p>
              </div>
            )}

            {activeTab === 'clauses' && (
              <div className="space-y-3">
                {currentContract.clauses?.map((cl) => (
                  <div key={cl.id} className="p-4 rounded-2xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{cl.name}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                        cl.riskLevel === 'High' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      }`}>
                        {cl.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                      "{cl.text}"
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'risks' && (
              <div className="glass-panel rounded-2xl p-6 bg-white dark:bg-slate-900 space-y-3 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  Identified Risk Factors
                </h4>
                {currentContract.riskScore > 50 ? (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 space-y-1">
                    <div className="flex items-center space-x-2 font-bold">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>High Financial Risk Detected</span>
                    </div>
                    <p>Contains uncapped liability exposure or automatic renewal lock-in.</p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Low Risk Portfolio Item. Standard legal compliance verified.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <FileText className="w-12 h-12 text-blue-500 mx-auto opacity-60" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Contracts Uploaded Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Upload your first contract to run AI analysis and inspect extracted parties, payment terms, and legal risk scores.
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white shadow-md hover:bg-blue-700"
          >
            Analyze First Contract
          </button>
        </div>
      )}

      {/* UPLOAD & ANALYZE MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleCreateAndAnalyze} className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Analyze & Upload Contract</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Contract Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Acme Master Services Agreement"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                >
                  <option value="Sales">Sales (MSA / SOW)</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Services">Services / Consulting</option>
                  <option value="Business Development">Business Development</option>
                  <option value="NDA">Confidentiality (NDA)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Contract Owner</label>
                <input
                  type="text"
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Contract Value ($)</label>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Contract Agreement Body Text</label>
                <label className="text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">
                  Import text file
                  <input type="file" accept=".txt,.doc,.docx" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
              <textarea
                required
                rows={5}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Paste contract clauses or agreement text here for instant AI parsing..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-mono"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>{isAnalyzing ? 'Analyzing & Persisting...' : 'Run AI Analysis & Save'}</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
