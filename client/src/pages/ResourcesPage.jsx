import React, { useState } from 'react';
import { BookOpen, FileText, Download, Sparkles, Search, Tag, CheckCircle2, X } from 'lucide-react';

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const resources = [
    {
      id: 1,
      category: 'whitepaper',
      title: '2026 Enterprise SaaS Vendor Risk Benchmark Report',
      summary: 'Analysis of liability caps, data privacy disclosures, and SLA commitments across top 100 enterprise software vendors.',
      readTime: '12 Min Read',
      date: 'July 2026',
      content: 'Detailed analysis of 500+ MSAs revealed that 34% of cloud vendors include uncapped liability clauses for privacy breaches unless explicitly redlined.',
    },
    {
      id: 2,
      category: 'template',
      title: 'Standard Mutual Non-Disclosure Agreement (NDA) Template',
      summary: 'Enterprise-grade mutual NDA template with standard confidentiality terms, governing law, and 3-year term duration.',
      readTime: 'Legal Template',
      date: 'June 2026',
      content: 'Standard Mutual NDA Template content optimized for B2B transactions. Fully customizable for Delaware or California jurisdiction.',
    },
    {
      id: 3,
      category: 'guide',
      title: 'SOC 2 & GDPR Vendor Audit Compliance Guide',
      summary: 'Step-by-step audit playbook for evaluating third-party vendor security declarations, ISO 27001 certs, and data processing addendums.',
      readTime: '8 Min Read',
      date: 'May 2026',
      content: 'How to structure vendor compliance reviews: 1. Verify SOC 2 Type II audit report dates. 2. Ensure HIPAA BAA is signed. 3. Check AI model training opt-outs.',
    },
    {
      id: 4,
      category: 'casestudy',
      title: 'How FinTech Global Reduced MSA Review Time by 78%',
      summary: 'Case study on how a tier-1 financial institution digitized 2,400 legacy vendor contracts and automated risk parsing with Pacto.',
      readTime: 'Case Study',
      date: 'April 2026',
      content: 'FinTech Global implemented Pacto to replace manual legal review queues. Average procurement time dropped from 14 days to 48 hours.',
    },
    {
      id: 5,
      category: 'blog',
      title: '5 Hidden Contract Clauses Procurement Teams Miss',
      summary: 'Explores auto-renewal windows, perpetual IP grants, uncapped liability traps, and hidden price escalation clauses in software agreements.',
      readTime: '5 Min Read',
      date: 'March 2026',
      content: 'Auto-renewal notice periods are the #1 hidden cost trap in enterprise SaaS. Always insist on a 60-day or 90-day written notice window.',
    },
    {
      id: 6,
      category: 'template',
      title: 'Data Protection Addendum (DPA) Standard Annex',
      summary: 'GDPR and DPDP compliant Data Protection Addendum annex template for cloud service processors.',
      readTime: 'Legal Template',
      date: 'February 2026',
      content: 'Includes Standard Contractual Clauses (SCCs), data sub-processor disclosures, and technical organizational security measures.',
    },
  ];

  const filtered = resources.filter(r => {
    const matchesTab = activeTab === 'all' || r.category === activeTab;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-12 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-500 uppercase">
          Pacto Knowledge Hub
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Contract Intelligence & <span className="gradient-text-emerald">Legal Resources</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Whitepapers, legal templates, compliance guides, and industry reports curated by Pacto legal specialists.
        </p>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'whitepaper', 'template', 'guide', 'casestudy', 'blog'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'glass-panel text-slate-700 dark:text-slate-300 hover:border-emerald-500/50'
              }`}
            >
              {tab === 'all' ? 'All Resources' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, templates..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="p-6 rounded-2xl glass-panel glass-card-hover space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{item.readTime}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.summary}</p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-obsidian-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
              <button
                onClick={() => setSelectedItem(item)}
                className="text-emerald-500 font-bold hover:underline"
              >
                Read / Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full rounded-2xl p-6 space-y-4 border border-slate-200 dark:border-obsidian-700 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500">
              {selectedItem.category}
            </span>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedItem.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{selectedItem.content}</p>

            <div className="pt-4 flex justify-end space-x-2">
              <button
                onClick={() => alert(`Downloading resource: ${selectedItem.title}`)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
