import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, Search, CheckCircle2, ShieldCheck, Lock, Download, ExternalLink, Filter, GitCompare, Briefcase, X, ArrowRight } from 'lucide-react';

export default function VendorExplorer() {
  const { user } = useApp();
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [comparingVendors, setComparingVendors] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const resp = await fetch('/api/vendors');
        if (resp.ok) {
          const data = await resp.json();
          setVendors(data);
          if (data.length > 0) {
            setSelectedVendor(data[0]);
            setComparingVendors(data.slice(0, 3)); // Default AWS, Azure, GCP
          }
        }
      } catch (err) {
        console.error('Failed to fetch vendor matrix:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchVendors();
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);

    if (q.length > 2) {
      fetch('/api/vendors/search-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, userId: user?.id, userEmail: user?.email }),
      }).catch(console.error);
    }
  };

  const toggleCompareVendor = (vendor) => {
    if (comparingVendors.find(v => v.name === vendor.name)) {
      setComparingVendors(comparingVendors.filter(v => v.name !== vendor.name));
    } else {
      if (comparingVendors.length >= 3) {
        alert('You can compare up to 3 vendors simultaneously.');
        return;
      }
      setComparingVendors([...comparingVendors, vendor]);
    }
  };

  const filteredVendors = vendors.filter(v =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const compliance = selectedVendor?.complianceJson ? JSON.parse(selectedVendor.complianceJson) : {};
  const security = selectedVendor?.securityJson ? JSON.parse(selectedVendor.securityJson) : {};
  const terms = selectedVendor?.termsJson ? JSON.parse(selectedVendor.termsJson) : {};
  const officialDocs = selectedVendor?.officialDocs ? JSON.parse(selectedVendor.officialDocs) : {};

  return (
    <div className="space-y-8 py-4">
      
      {/* Top Banner */}
      <div className="pb-6 border-b border-slate-200 dark:border-obsidian-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold uppercase">
            Primary Enterprise Acquisition Funnel
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2 mt-1">
            <span>Vendor Explorer</span>
            <span className="gradient-text-emerald">Lookup Tool</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Search enterprise cloud vendors and compare SOC 2, ISO 27001, GDPR, SLAs, and AI data training policies side-by-side.
          </p>
        </div>

        {/* Search Input & Modal Triggers */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Azure, AWS, GCP, Slack..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={() => setShowCompareModal(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 flex items-center justify-center space-x-1.5 shadow-md"
          >
            <GitCompare className="w-4 h-4" />
            <span>Compare ({comparingVendors.length})</span>
          </button>
        </div>
      </div>

      {/* Main Vendor Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Vendor Selection List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center justify-between">
            <span>Enterprise Cloud Vendors</span>
            <span className="text-[10px] font-mono text-slate-400">{filteredVendors.length} Verified</span>
          </h3>

          {filteredVendors.map((vendor) => {
            const isSelected = selectedVendor?.name === vendor.name;
            const isCompared = comparingVendors.some(v => v.name === vendor.name);
            return (
              <div
                key={vendor._id || vendor.name}
                className={`p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : 'glass-panel hover:bg-slate-100 dark:hover:bg-obsidian-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedVendor(vendor)}
                    className="flex items-center space-x-3 text-left flex-1"
                  >
                    <span className="text-2xl">{vendor.logo}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{vendor.name}</h4>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{vendor.category}</span>
                    </div>
                  </button>

                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-mono font-bold text-emerald-500">
                      {vendor.trustScore}% Trust
                    </span>
                    <button
                      onClick={() => toggleCompareVendor(vendor)}
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border transition-colors ${
                        isCompared
                          ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                          : 'bg-slate-200 dark:bg-obsidian-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {isCompared ? 'Comparing ✓' : '+ Add Compare'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Detailed Vendor Compliance Sheet */}
        {selectedVendor && (
          <div className="lg:col-span-2 glass-panel rounded-2xl p-6 space-y-6">
            
            {/* Header with Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-obsidian-800 gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{selectedVendor.logo}</span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedVendor.name}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedVendor.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert(`Downloading compliance report for ${selectedVendor.name}`)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-obsidian-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-emerald-500 flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report</span>
                </button>

                <button
                  onClick={() => setShowConsultModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center space-x-1"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>

            {/* Grid 1: Compliance Certifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Compliance Certifications
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(compliance).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-xl bg-slate-100 dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 text-xs space-y-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase">{key}</span>
                    <div className="font-semibold text-emerald-500 flex items-center space-x-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid 2: Security Controls */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Security Infrastructure & Encryption
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(security).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-xl bg-slate-100 dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800">
                    <strong className="text-slate-900 dark:text-white block font-mono text-[11px] mb-0.5">{key}</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid 3: Data Privacy & AI Terms */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Data Privacy & Commercial AI Policies
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(terms).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <strong className="text-amber-500 block font-mono text-[11px] mb-0.5">{key}</strong>
                    <span className="text-slate-700 dark:text-slate-300 text-[11px]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Multi-Vendor Compare Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-4xl w-full rounded-2xl p-6 space-y-6 border border-slate-200 dark:border-obsidian-700 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-obsidian-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <GitCompare className="w-5 h-5 text-emerald-500" />
                <span>Multi-Vendor Comparison Matrix</span>
              </h3>
              <button onClick={() => setShowCompareModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {comparingVendors.map((v, i) => {
                const c = JSON.parse(v.complianceJson || '{}');
                const s = JSON.parse(v.securityJson || '{}');
                const t = JSON.parse(v.termsJson || '{}');
                return (
                  <div key={i} className="p-4 rounded-xl bg-slate-100 dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 space-y-3 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{v.logo}</span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{v.name}</h4>
                        <span className="text-emerald-500 font-mono text-[10px] font-bold">{v.trustScore}% Trust Score</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-obsidian-800 text-[11px]">
                      <div>SOC 2: <strong className="text-slate-800 dark:text-slate-200">{c.SOC2}</strong></div>
                      <div>GDPR: <strong className="text-emerald-500">{c.GDPR}</strong></div>
                      <div>Encryption: <strong className="text-slate-800 dark:text-slate-200">{s.Encryption}</strong></div>
                      <div>SLA: <strong className="text-amber-500">{t.SLA}</strong></div>
                      <div>AI Policy: <strong className="text-slate-800 dark:text-slate-200">{t.AIPolicy}</strong></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Book Consultation Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full rounded-2xl p-6 space-y-4 border border-slate-200 dark:border-obsidian-700 relative text-center">
            <button onClick={() => setShowConsultModal(false)} className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <Briefcase className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Book Vendor Audit Consultation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Request a custom compliance audit for {selectedVendor?.name || 'this vendor'} with Pacto legal advisors.
            </p>
            <button
              onClick={() => {
                alert(`Consultation request submitted for ${selectedVendor?.name}.`);
                setShowConsultModal(false);
              }}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500 text-slate-950"
            >
              Confirm Consultation Request
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
