import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle2, Lock, FileText, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1: Brand & Overview */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Pacto<span className="text-blue-400">.ai</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pacto is the AI-powered Contract Intelligence & Business Decision Platform that combines legal risk detection, commercial financial modeling, obligation tracking, and executive decision support.
            </p>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>All Systems Operational • SOC 2 Type II Certified</span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Platform & Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/features" className="hover:text-blue-400 transition-colors">AI Contract Review</Link></li>
              <li><Link to="/features" className="hover:text-blue-400 transition-colors">Business Intelligence Engine</Link></li>
              <li><Link to="/features" className="hover:text-blue-400 transition-colors">P&L Simulator</Link></li>
              <li><Link to="/features" className="hover:text-blue-400 transition-colors">AI Contract Builder</Link></li>
              <li><Link to="/features" className="hover:text-blue-400 transition-colors">Negotiation Center</Link></li>
              <li><Link to="/features" className="hover:text-blue-400 transition-colors">Obligation Tracker</Link></li>
            </ul>
          </div>

          {/* Col 3: Solutions & Use Cases */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/solutions" className="hover:text-blue-400 transition-colors">For Legal Teams</Link></li>
              <li><Link to="/solutions" className="hover:text-blue-400 transition-colors">For Procurement</Link></li>
              <li><Link to="/solutions" className="hover:text-blue-400 transition-colors">For Finance Teams</Link></li>
              <li><Link to="/solutions" className="hover:text-blue-400 transition-colors">For Sales Operations</Link></li>
              <li><Link to="/solutions" className="hover:text-blue-400 transition-colors">For Enterprise & Law Firms</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Security & Trust
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>SOC 2 Type II Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>ISO 27001 & GDPR Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>AES-256 Bit Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Google OAuth 2.0 & SAML SSO</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Pacto Technologies Inc. All rights reserved.</span>
          <div className="flex items-center space-x-6 text-xs">
            <Link to="/platform" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/platform" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Trust Center</Link>
            <Link to="/admin" className="hover:text-blue-400 transition-colors flex items-center gap-1 text-slate-400">
              <span>Admin Portal</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
