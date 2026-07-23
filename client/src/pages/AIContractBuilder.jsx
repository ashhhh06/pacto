import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileCode, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Copy, 
  Download, FileText, Check, ShieldCheck, RefreshCw, Layers
} from 'lucide-react';

export default function AIContractBuilder() {
  const { addContract } = useApp();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Select Contract Type
  const CONTRACT_TYPES = [
    { id: 'MSA', name: 'Master Services Agreement (MSA)', desc: 'Enterprise baseline terms for ongoing services' },
    { id: 'NDA', name: 'Non-Disclosure Agreement (NDA)', desc: 'Mutual or unilateral confidentiality protection' },
    { id: 'SaaS', name: 'SaaS Subscription Agreement', desc: 'Software-as-a-Service licensing & SLA terms' },
    { id: 'SOW', name: 'Statement of Work (SOW)', desc: 'Project deliverables, milestones & timelines' },
    { id: 'Vendor', name: 'Vendor Procurement Contract', desc: 'Third-party vendor service level agreement' },
    { id: 'Employment', name: 'Executive Employment Agreement', desc: 'Compensation, IP assignment & non-compete' },
    { id: 'Freelancer', name: 'Contractor / Freelancer Agreement', desc: 'Independent contractor work-for-hire terms' },
    { id: 'Partnership', name: 'Strategic Partnership Agreement', desc: 'Joint venture, revenue share & co-marketing' },
  ];

  const [selectedType, setSelectedType] = useState('MSA');

  // Step 2: Business Details
  const [businessDetails, setBusinessDetails] = useState({
    companyName: 'Pacto Technologies Inc.',
    clientName: 'AeroDynamics Global Corp',
    currency: 'USD ($)',
    country: 'United States',
    durationMonths: '24',
    totalValue: '1200000',
  });

  // Step 3: Legal Preferences Checkboxes
  const [legalPrefs, setLegalPrefs] = useState({
    paymentTerms: 'Monthly Net 30', // Monthly, Quarterly, Annual, Milestone
    terminationWindow: '30 Days Written Notice', // 30 Days, 60 Days, Immediate
    ipOwnership: 'Company Retains Core IP', // Client, Company, Shared
    confidentiality: 'Include Mutual NDA (3 Years)', // Include NDA, Exclude NDA
    disputeResolution: 'Binding AAA Arbitration', // Arbitration, Mediation, Court
    complianceFlags: {
      gdpr: true,
      dpdp: true,
      hipaa: false,
      soc2: true
    }
  });

  // Step 4: AI Generated Contract Text Output
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setCurrentStep(4);

    setTimeout(() => {
      const draftText = `
================================================================================
                        ${selectedType.toUpperCase()} AGREEMENT
================================================================================

THIS MASTER AGREEMENT (the "Agreement") is entered into as of ${new Date().toLocaleDateString()} 
by and between ${businessDetails.companyName} ("Provider / Company"), operating under 
the laws of ${businessDetails.country}, and ${businessDetails.clientName} ("Client / Recipient").

1. SCOPE OF SERVICES & COMMERICAL VALUE
--------------------------------------------------------------------------------
1.1 Provider shall supply enterprise intelligence services for a duration of ${businessDetails.durationMonths} months.
1.2 Total Contract Consideration: ${businessDetails.currency} ${Number(businessDetails.totalValue).toLocaleString()}.

2. PAYMENT & INVOICING TERMS
--------------------------------------------------------------------------------
2.1 Payment Schedule: ${legalPrefs.paymentTerms}. Invoices not paid within term limits accrue 1.5% monthly late interest.

3. INTELLECTUAL PROPERTY & DATA RIGHTS
--------------------------------------------------------------------------------
3.1 Ownership Allocation: ${legalPrefs.ipOwnership}.
3.2 Proprietary Codebase: All AI engine algorithms, models, and derivative works remain the exclusive property of Provider.

4. CONFIDENTIALITY & NON-DISCLOSURE
--------------------------------------------------------------------------------
4.1 Obligation: ${legalPrefs.confidentiality}. Proprietary financial information and trade secrets shall be held in strict confidence.

5. TERMINATION & CANCELLATION
--------------------------------------------------------------------------------
5.1 Termination Window: Either party may terminate this Agreement upon ${legalPrefs.terminationWindow}.

6. DISPUTE RESOLUTION & COMPLIANCE
--------------------------------------------------------------------------------
6.1 Forum & Governing Law: Any dispute arising out of this Agreement shall be resolved via ${legalPrefs.disputeResolution}.
6.2 Regulatory Compliance Standards: ${Object.entries(legalPrefs.complianceFlags).filter(([k,v]) => v).map(([k]) => k.toUpperCase()).join(', ')}.

IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first written above.

PROVIDER: ${businessDetails.companyName}             CLIENT: ${businessDetails.clientName}
Signature: __________________________            Signature: __________________________
Title: Authorized Signatory                      Title: Authorized Executive
`.trim();

      setGeneratedDraft(draftText);
      setIsGenerating(false);
    }, 1000);
  };

  const handleSaveToPortfolio = () => {
    addContract({
      title: `${selectedType} - ${businessDetails.clientName}`,
      client: businessDetails.clientName,
      type: selectedType,
      category: 'Sales',
      value: Number(businessDetails.totalValue),
      paymentTerms: legalPrefs.paymentTerms,
      governingLaw: `${businessDetails.country} Law`
    });
    alert('Contract draft successfully saved to your active portfolio repository!');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <FileCode className="w-3.5 h-3.5" />
            <span>Interactive 3-Step Wizard • Feature 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            AI Contract Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Generate compliant enterprise agreements in seconds based on custom legal preferences.
          </p>
        </div>

        {/* Wizard Step Progress Tracker */}
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                currentStep === s
                  ? 'bg-blue-600 text-white ring-2 ring-blue-500/30'
                  : currentStep > s
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {currentStep > s ? <Check className="w-3.5 h-3.5" /> : s}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: SELECT CONTRACT TYPE */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Step 1: Select Enterprise Contract Type</h2>
            <p className="text-xs text-slate-500">Choose the baseline template structure for your agreement.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTRACT_TYPES.map(t => (
              <div
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedType === t.id
                    ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800">
                    {t.id}
                  </span>
                  {selectedType === t.id && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">{t.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>Next: Business Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: BUSINESS DETAILS */}
      {currentStep === 2 && (
        <div className="space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Step 2: Commercial & Entity Details</h2>
            <p className="text-xs text-slate-500">Input party names, jurisdiction, duration, and financial value.</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Company</label>
                <input
                  type="text"
                  value={businessDetails.companyName}
                  onChange={(e) => setBusinessDetails({ ...businessDetails, companyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Client / Counterparty</label>
                <input
                  type="text"
                  value={businessDetails.clientName}
                  onChange={(e) => setBusinessDetails({ ...businessDetails, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Governing Country</label>
                <input
                  type="text"
                  value={businessDetails.country}
                  onChange={(e) => setBusinessDetails({ ...businessDetails, country: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Duration (Months)</label>
                <input
                  type="number"
                  value={businessDetails.durationMonths}
                  onChange={(e) => setBusinessDetails({ ...businessDetails, durationMonths: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Total Contract Value ($)</label>
              <input
                type="number"
                value={businessDetails.totalValue}
                onChange={(e) => setBusinessDetails({ ...businessDetails, totalValue: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center space-x-1.5"
            >
              <span>Next: Legal Preferences</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: LEGAL PREFERENCES & CHECKBOXES */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Step 3: Legal Policy Preferences & Compliance</h2>
            <p className="text-xs text-slate-500">Configure clauses according to your company playbook rules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Payment Terms */}
            <div className="p-4 rounded-2xl glass-panel space-y-3 bg-white dark:bg-slate-900">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">Payment Schedule Terms</label>
              {['Monthly Net 30', 'Quarterly Upfront', 'Annual Upfront', 'Milestone Based'].map((opt) => (
                <label key={opt} className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentTerms"
                    checked={legalPrefs.paymentTerms === opt}
                    onChange={() => setLegalPrefs({ ...legalPrefs, paymentTerms: opt })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {/* IP Ownership */}
            <div className="p-4 rounded-2xl glass-panel space-y-3 bg-white dark:bg-slate-900">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">IP Ownership Allocation</label>
              {['Company Retains Core IP', 'Client Owns Work-for-Hire', 'Shared Joint IP Rights'].map((opt) => (
                <label key={opt} className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="ipOwnership"
                    checked={legalPrefs.ipOwnership === opt}
                    onChange={() => setLegalPrefs({ ...legalPrefs, ipOwnership: opt })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {/* Termination Window */}
            <div className="p-4 rounded-2xl glass-panel space-y-3 bg-white dark:bg-slate-900">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">Termination Notice Period</label>
              {['30 Days Written Notice', '60 Days Written Notice', 'Immediate for Breach'].map((opt) => (
                <label key={opt} className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="terminationWindow"
                    checked={legalPrefs.terminationWindow === opt}
                    onChange={() => setLegalPrefs({ ...legalPrefs, terminationWindow: opt })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {/* Compliance Flags */}
            <div className="p-4 rounded-2xl glass-panel space-y-3 bg-white dark:bg-slate-900">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">Compliance Schedules</label>
              {Object.keys(legalPrefs.complianceFlags).map((flag) => (
                <label key={flag} className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer uppercase font-mono">
                  <input
                    type="checkbox"
                    checked={legalPrefs.complianceFlags[flag]}
                    onChange={(e) => setLegalPrefs({
                      ...legalPrefs,
                      complianceFlags: { ...legalPrefs.complianceFlags, [flag]: e.target.checked }
                    })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{flag} Compliance Schedule</span>
                </label>
              ))}
            </div>

          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleGenerate}
              className="px-8 py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-white animate-spin" />
              <span>Generate AI Draft</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: AI GENERATED CONTRACT PREVIEW */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI-Generated Legal Draft Document</h2>
              <p className="text-xs text-slate-500">Ready for review, export, or adding to active contract portfolio.</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedDraft);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Draft'}</span>
              </button>
              <button
                onClick={handleSaveToPortfolio}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Save to Active Repository</span>
              </button>
            </div>
          </div>

          {isGenerating ? (
            <div className="p-16 text-center space-y-4 glass-panel rounded-3xl">
              <Sparkles className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Pacto AI Engine is drafting clauses & applying company playbook rules...
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed space-y-4 border border-slate-800 shadow-2xl max-h-[500px] overflow-y-auto whitespace-pre-wrap">
              {generatedDraft}
            </div>
          )}

          <div className="flex justify-start">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center space-x-1"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Create Another Draft</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
