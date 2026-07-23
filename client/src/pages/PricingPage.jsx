import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const PLANS = [
    {
      name: 'Starter',
      desc: 'Ideal for growing startups and boutique law firms.',
      monthlyPrice: 599,
      annualPrice: 499,
      features: [
        'Up to 50 active contracts',
        'AI Contract Review & Risk Scoring',
        '3-Step AI Contract Builder',
        'Obligation Task Extraction',
        'Email Support'
      ]
    },
    {
      name: 'Pro (Recommended)',
      desc: 'For mid-market enterprises, procurement, and finance teams.',
      monthlyPrice: 1799,
      annualPrice: 1499,
      featured: true,
      features: [
        'Up to 250 active contracts',
        'Business Intelligence & P&L Simulator',
        'Negotiation Center & Version Diff',
        'Company Playbook Compliance Engine',
        'Renewal Notice Window Radar',
        'Priority Support'
      ]
    },
    {
      name: 'Enterprise',
      desc: 'For large corporate legal departments and multi-tenant operations.',
      monthlyPrice: 4499,
      annualPrice: 3999,
      features: [
        'Unlimited active contracts',
        'Full 12 Core Capabilities Suite',
        'Custom Gemini Model Fine-Tuning',
        'Dedicated Customer Success Manager',
        'SOC 2 Type II Audit Log Stream',
        'SAML SSO & Custom Webhooks'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
          Transparent Enterprise Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Predictable Subscription Plans for Every Enterprise
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Choose the plan that fits your contract volume and business intelligence requirements.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="flex items-center justify-center space-x-3 pt-4">
          <span className={`text-xs font-semibold ${!annual ? 'text-blue-600' : 'text-slate-500'}`}>Monthly Billing</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-12 h-6 rounded-full bg-blue-600 p-1 transition-colors relative"
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${annual ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
          <span className={`text-xs font-semibold ${annual ? 'text-blue-600' : 'text-slate-500'}`}>
            Annual Billing <strong className="text-emerald-500 font-mono">(Save 20%)</strong>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PLANS.map((p, idx) => (
          <div
            key={idx}
            className={`glass-panel rounded-3xl p-8 space-y-6 flex flex-col justify-between relative ${
              p.featured ? 'border-2 border-blue-600 bg-white dark:bg-slate-900 shadow-2xl scale-105' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold font-mono bg-blue-600 text-white uppercase tracking-wider">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{p.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              
              <div className="flex items-baseline space-x-1 font-mono">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  ${annual ? p.annualPrice : p.monthlyPrice}
                </span>
                <span className="text-xs text-slate-500 font-sans">/ month</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/register"
              className={`w-full py-3 rounded-xl font-bold text-xs text-center transition-all ${
                p.featured ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/25' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200'
              }`}
            >
              Start 14-Day Free Trial
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
