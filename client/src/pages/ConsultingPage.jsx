import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle2, ArrowRight, Sparkles, Building2, Zap, Clock, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ConsultingPage() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', service: 'Contract Digitization', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const services = [
    {
      title: 'Contract Digitization',
      desc: 'Transform thousands of legacy paper or image PDFs into searchable, structured AI metadata.',
      benefits: ['Searchable repository', 'OCR & metadata extraction', 'Historical risk discovery'],
      timeline: '2 - 4 Weeks',
    },
    {
      title: 'Contract Lifecycle Automation',
      desc: 'Design automated approval workflows, redline routing, and renewal alert systems.',
      benefits: ['Automated approval matrices', 'Renewal notice triggers', 'Reduced bottlenecks'],
      timeline: '3 - 6 Weeks',
    },
    {
      title: 'Procurement Process Optimization',
      desc: 'Standardize vendor evaluation, SLA benchmarks, and compliance reviews across procurement.',
      benefits: ['Standardized vendor scoring', 'Lower software spend', 'Faster vendor onboarding'],
      timeline: '4 - 8 Weeks',
    },
    {
      title: 'AI Adoption Strategy',
      desc: 'Guide legal and procurement teams on adopting generative AI safely without data leak risks.',
      benefits: ['Zero data retention setup', 'Prompting guidelines', 'Legal team training'],
      timeline: '2 - 3 Weeks',
    },
    {
      title: 'Compliance Readiness Audit',
      desc: 'Audit your current vendor agreements against SOC 2, ISO 27001, GDPR, and DPDP mandates.',
      benefits: ['Regulatory gap assessment', 'Standard DPA clauses', 'Audit-ready reports'],
      timeline: '3 - 5 Weeks',
    },
    {
      title: 'Custom Integration Development',
      desc: 'Connect Pacto directly with Salesforce, SAP, Oracle, ServiceNow, or custom ERP systems.',
      benefits: ['Custom REST API hooks', 'Real-time sync', 'Dedicated engineering support'],
      timeline: 'Custom Scope',
    },
  ];

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-bold text-amber-500 uppercase">
          Enterprise Consulting Division
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Transform Your Enterprise <span className="gradient-text-amber">Legal Workflows</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Alongside our SaaS platform, Pacto’s legal and AI specialists help global organizations digitize legacy contracts, automate procurement workflows, and achieve compliance readiness.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="p-6 rounded-2xl glass-panel glass-card-hover space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold font-mono text-xs">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{service.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{service.desc}</p>
              
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Key Deliverables</span>
                {service.benefits.map((b, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-obsidian-800 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">Est. Timeline: {service.timeline}</span>
              <a href="#schedule-form" className="text-amber-500 font-semibold hover:underline flex items-center space-x-1">
                <span>Book</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Consultation Booking Form */}
      <div id="schedule-form" className="glass-panel rounded-2xl p-8 border border-slate-200 dark:border-obsidian-700 max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Briefcase className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Schedule a Consulting Briefing</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Speak with a Pacto legal transformation consultant to evaluate your organization's workflow needs.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-8 h-8 mx-auto" />
            <h4 className="font-bold text-sm">Consultation Request Received!</h4>
            <p className="text-xs">A Pacto legal specialist will reach out within 24 hours to confirm your briefing session.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Organization</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Global Inc."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@acmeglobal.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Consulting Interest</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {services.map((s, idx) => (
                    <option key={idx} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Workflow Notes (Optional)</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your current contract volume and tools..."
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-md"
            >
              Request Consulting Briefing
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
