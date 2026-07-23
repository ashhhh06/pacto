import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Contact Pacto Enterprise Team</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Schedule a custom enterprise demo or speak with our contract intelligence advisors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Demo Request Received!</h3>
              <p className="text-xs text-slate-500">A Pacto enterprise specialist will reach out within 2 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Work Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Company Name</label>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message / Request Details</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                />
              </div>

              <button type="submit" className="w-full py-3 rounded-xl font-bold text-xs bg-blue-600 text-white shadow-md flex items-center justify-center space-x-1.5">
                <Send className="w-4 h-4" />
                <span>Submit Demo Request</span>
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6 text-xs text-slate-600 dark:text-slate-400">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Global Headquarters</h3>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /> 100 Montgomery St, Suite 2400, San Francisco, CA</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-500" /> enterprise@pacto.io</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-500" /> +1 (800) 555-PACTO</p>
          </div>
        </div>
      </div>
    </div>
  );
}
