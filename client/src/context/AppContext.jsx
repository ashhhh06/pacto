import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Sample initial enterprise contract dataset for Pacto
const INITIAL_CONTRACTS = [
  {
    id: 'ctr-101',
    title: 'Enterprise Master Services Agreement (MSA)',
    client: 'Acme Global Corp',
    type: 'MSA',
    category: 'Sales',
    status: 'Active',
    effectiveDate: '2025-01-15',
    expiryDate: '2028-01-14',
    renewalDate: '2027-11-15',
    noticePeriodDays: 60,
    autoRenewal: true,
    value: 1450000,
    annualValue: 483333,
    expectedRevenue: 1620000,
    estimatedProfit: 580000,
    profitMargin: 35.8,
    recurringRevenue: true,
    paymentTerms: 'Net 30',
    governingLaw: 'Delaware, USA',
    healthScore: 92,
    riskScore: 24, // Low Risk
    department: 'Sales',
    owner: 'Sarah Jenkins',
    parties: {
      provider: 'Pacto Technologies Inc.',
      client: 'Acme Global Corp',
      signatories: [
        { name: 'Marcus Vance', title: 'VP Sales', status: 'Signed' },
        { name: 'Elena Rostova', title: 'General Counsel (Acme)', status: 'Signed' }
      ]
    },
    clauses: [
      {
        id: 'c-1',
        name: 'Limitation of Liability',
        type: 'Liability',
        text: 'Neither party shall be liable for indirect, incidental, or consequential damages. Aggregate liability is capped at 2x annual fees paid.',
        summary: 'Caps total liability at 2x total contract value. Standard enterprise protection.',
        riskLevel: 'Low',
        purpose: 'Protects both companies from catastrophic damages.',
        industryStandard: '1x to 2x Annual Contract Value',
        policyMatch: true,
        alternativeSuggestion: 'Cap at 1x Annual Contract Value if client pushes back.',
        negotiationTip: 'Hold firm on 2x cap for high-throughput SaaS workloads.'
      },
      {
        id: 'c-2',
        name: 'Intellectual Property Ownership',
        type: 'IP',
        text: 'All custom deliverables, inventions, and derivative works created during the term belong exclusively to Pacto Technologies.',
        summary: 'Pacto retains 100% IP rights over all AI engine algorithms and enhancements.',
        riskLevel: 'Low',
        purpose: 'Prevents customer IP leak and protects core IP.',
        industryStandard: 'Vendor retains IP, customer gets non-exclusive license',
        policyMatch: true,
        alternativeSuggestion: 'Provide a perpetual non-exclusive operational license.',
        negotiationTip: 'Never allow work-for-hire provisions for core SaaS codebase.'
      },
      {
        id: 'c-3',
        name: 'Payment & Late Penalty Fee',
        type: 'Payment',
        text: 'Invoices due within 30 days. Late balances accrue 1.5% monthly compound interest.',
        summary: 'Requires Net 30 payment with 18% annual late fee penalty.',
        riskLevel: 'Medium',
        purpose: 'Ensures predictable cash flow and disincentivizes late payments.',
        industryStandard: 'Net 30 or Net 60',
        policyMatch: true,
        alternativeSuggestion: 'Waive late fees if paid within 15 days grace period.',
        negotiationTip: 'Clients frequently request Net 60; enforce a 3% early payment discount if Net 30.'
      }
    ],
    missingClauses: ['Cybersecurity Breach Indemnity Cap'],
    obligations: [
      { id: 'ob-1', task: 'Deliver Quarterly Security Audit Report', owner: 'DevOps Lead', dueDate: '2026-09-30', priority: 'High', status: 'Pending' },
      { id: 'ob-2', task: 'Execute Annual SLA Review meeting', owner: 'Customer Success', dueDate: '2026-11-15', priority: 'Medium', status: 'In Progress' }
    ],
    pnlData: {
      baseRevenue: 1450000,
      upsellPotential: 170000,
      infraCost: 420000,
      supportCost: 280000,
      netMargin: 35.8,
      cashFlowTimeline: [
        { month: 'Q1 2026', revenue: 362500, expenses: 175000 },
        { month: 'Q2 2026', revenue: 362500, expenses: 175000 },
        { month: 'Q3 2026', revenue: 362500, expenses: 175000 },
        { month: 'Q4 2026', revenue: 362500, expenses: 175000 }
      ]
    }
  },
  {
    id: 'ctr-102',
    title: 'Cloud Infrastructure Vendor SaaS Agreement',
    client: 'CloudScale Systems Inc',
    type: 'Vendor Agreement',
    category: 'Procurement',
    status: 'In Review',
    effectiveDate: '2025-06-01',
    expiryDate: '2027-05-31',
    renewalDate: '2027-03-31',
    noticePeriodDays: 30,
    autoRenewal: true,
    value: 680000,
    annualValue: 340000,
    expectedRevenue: 0, // Expenditure contract
    estimatedProfit: -680000,
    profitMargin: -100,
    recurringRevenue: false,
    paymentTerms: 'Net 45',
    governingLaw: 'California, USA',
    healthScore: 74,
    riskScore: 68, // High Risk
    department: 'Engineering',
    owner: 'Alex Rivera',
    parties: {
      provider: 'CloudScale Systems Inc',
      client: 'Pacto Technologies Inc.',
      signatories: [
        { name: 'Alex Rivera', title: 'VP Engineering', status: 'Pending Review' }
      ]
    },
    clauses: [
      {
        id: 'c-4',
        name: 'Unlimited Direct Damages',
        type: 'Liability',
        text: 'Customer agrees to indemnify Vendor for all third-party data loss claims without any monetary ceiling.',
        summary: 'UNLIMITED LIABILITY RISKS. Requires Pacto to absorb uncapped damages.',
        riskLevel: 'High',
        purpose: 'Shifts all external liability risks onto Pacto.',
        industryStandard: '1x Annual Fees Cap',
        policyMatch: false,
        alternativeSuggestion: 'Cap liability at total annual contract spend ($340,000).',
        negotiationTip: 'CRITICAL WARNING: Violates company playbook rule #2. Must reject unlimited liability.'
      },
      {
        id: 'c-5',
        name: 'Auto-Renewal Notification Window',
        type: 'Renewal',
        text: 'Contract auto-renews for 24 months unless written opt-out is received 120 days prior to expiry.',
        summary: '120-day notice requirement for non-renewal is restrictive.',
        riskLevel: 'High',
        purpose: 'Locks customer into mandatory long-term commitment.',
        industryStandard: '30-60 days written notice',
        policyMatch: false,
        alternativeSuggestion: 'Reduce notice window to 30 days prior.',
        negotiationTip: 'Set calendar alert immediately if signed; push for 30-day notice.'
      }
    ],
    missingClauses: ['Data Sovereignty Guarantee', 'SOC2 Type II Audit Requirement'],
    obligations: [
      { id: 'ob-3', task: 'Provide Opt-out notice 120 days before renewal', owner: 'Legal Team', dueDate: '2027-01-31', priority: 'High', status: 'Pending' }
    ],
    pnlData: {
      baseRevenue: 0,
      upsellPotential: 0,
      infraCost: 680000,
      supportCost: 0,
      netMargin: -100,
      cashFlowTimeline: [
        { month: 'Q1', revenue: 0, expenses: 170000 },
        { month: 'Q2', revenue: 0, expenses: 170000 },
        { month: 'Q3', revenue: 0, expenses: 170000 },
        { month: 'Q4', revenue: 0, expenses: 170000 }
      ]
    }
  },
  {
    id: 'ctr-103',
    title: 'Healthcare AI Analytics Statement of Work (SOW)',
    client: 'BioHealth Dynamics',
    type: 'Statement of Work',
    category: 'Services',
    status: 'Active',
    effectiveDate: '2025-03-01',
    expiryDate: '2026-08-31',
    renewalDate: '2026-07-01',
    noticePeriodDays: 30,
    autoRenewal: false,
    value: 890000,
    annualValue: 890000,
    expectedRevenue: 980000,
    estimatedProfit: 410000,
    profitMargin: 46.0,
    recurringRevenue: false,
    paymentTerms: 'Milestone Based',
    governingLaw: 'New York, USA',
    healthScore: 88,
    riskScore: 32, // Low-Medium
    department: 'Consulting',
    owner: 'Elena Rostova',
    parties: {
      provider: 'Pacto Technologies Inc.',
      client: 'BioHealth Dynamics',
      signatories: [
        { name: 'David Sterling', title: 'CEO', status: 'Signed' },
        { name: 'Dr. Arthur Pendelton', title: 'CIO (BioHealth)', status: 'Signed' }
      ]
    },
    clauses: [
      {
        id: 'c-6',
        name: 'HIPAA & BAA Data Protection Clause',
        type: 'Compliance',
        text: 'Provider warrants strict adherence to HIPAA guidelines and shall execute Business Associate Agreement (BAA).',
        summary: 'Standard healthcare compliance binding both parties to HIPAA data security.',
        riskLevel: 'Low',
        purpose: 'Ensures compliance with federal patient privacy regulations.',
        industryStandard: 'Standard HIPAA BAA Schedule',
        policyMatch: true,
        alternativeSuggestion: 'Standard approved language.',
        negotiationTip: 'Ensure cloud encryption keys remain under Pacto KMS.'
      }
    ],
    missingClauses: ['Force Majeure Exception for Pandemic Outbreaks'],
    obligations: [
      { id: 'ob-4', task: 'Complete Milestone 2 Model Validation', owner: 'AI Engineering Team', dueDate: '2026-08-15', priority: 'High', status: 'In Progress' }
    ],
    pnlData: {
      baseRevenue: 890000,
      upsellPotential: 90000,
      infraCost: 260000,
      supportCost: 220000,
      netMargin: 46.0,
      cashFlowTimeline: [
        { month: 'Phase 1', revenue: 250000, expenses: 100000 },
        { month: 'Phase 2', revenue: 340000, expenses: 180000 },
        { month: 'Phase 3', revenue: 300000, expenses: 100000 }
      ]
    }
  },
  {
    id: 'ctr-104',
    title: 'Financial Data Analytics Partnership Agreement',
    client: 'Apex Capital Partners',
    type: 'Partnership',
    category: 'Business Development',
    status: 'Pending Signature',
    effectiveDate: '2025-08-01',
    expiryDate: '2027-07-31',
    renewalDate: '2027-06-01',
    noticePeriodDays: 60,
    autoRenewal: true,
    value: 2300000,
    annualValue: 1150000,
    expectedRevenue: 2850000,
    estimatedProfit: 1220000,
    profitMargin: 53.0,
    recurringRevenue: true,
    paymentTerms: 'Net 30',
    governingLaw: 'London / UK Law',
    healthScore: 95,
    riskScore: 18, // Very Low
    department: 'Strategic Partnerships',
    owner: 'Marcus Vance',
    parties: {
      provider: 'Pacto Technologies Inc.',
      client: 'Apex Capital Partners',
      signatories: [
        { name: 'Marcus Vance', title: 'VP Partnerships', status: 'Signed' },
        { name: 'Lord Henry Sterling', title: 'Managing Partner', status: 'Pending' }
      ]
    },
    clauses: [
      {
        id: 'c-7',
        name: 'Mutual Non-Disclosure & Confidentiality',
        type: 'Confidentiality',
        text: 'Proprietary financial algorithms and trade secrets remain strictly confidential for a duration of 5 years post-termination.',
        summary: 'Standard 5-year NDA protecting trade secrets and customer financial models.',
        riskLevel: 'Low',
        purpose: 'Protects proprietary algorithms and deal pipelines.',
        industryStandard: '3-5 years post-termination',
        policyMatch: true,
        alternativeSuggestion: 'Standard approved language.',
        negotiationTip: 'Ensure trade secrets have indefinite protection beyond 5 years.'
      }
    ],
    missingClauses: [],
    obligations: [
      { id: 'ob-5', task: 'Joint Press Release Approval', owner: 'Marketing Director', dueDate: '2026-08-10', priority: 'Medium', status: 'Pending' }
    ],
    pnlData: {
      baseRevenue: 2300000,
      upsellPotential: 550000,
      infraCost: 600000,
      supportCost: 480000,
      netMargin: 53.0,
      cashFlowTimeline: [
        { month: 'Year 1', revenue: 1150000, expenses: 540000 },
        { month: 'Year 2', revenue: 1150000, expenses: 540000 }
      ]
    }
  }
];

// Initial Company Playbook Policy Rules
const INITIAL_PLAYBOOK = [
  { id: 'pb-1', title: 'Always Include Non-Disclosure Agreement (NDA)', category: 'Confidentiality', rule: 'Every agreement must include standard 3+ year mutual NDA.', severity: 'Mandatory', active: true },
  { id: 'pb-2', title: 'Never Allow Unlimited Liability', category: 'Liability', rule: 'Liability must always be capped at maximum 2x annual contract fees.', severity: 'Mandatory', active: true },
  { id: 'pb-3', title: 'Pacto IP Retainment Requirement', category: 'IP Rights', rule: 'Pacto retains 100% ownership of core AI codebase, models, and derivative works.', severity: 'Mandatory', active: true },
  { id: 'pb-4', title: 'Maximum Net 45 Payment Terms', category: 'Finance', rule: 'Payment terms must not exceed Net 45 days. Late fee penalty of 1.5%/mo required.', severity: 'Important', active: true },
  { id: 'pb-5', title: 'Binding Arbitration & Neutral Governing Law', category: 'Dispute Resolution', rule: 'Disputes resolved via binding ICC or AAA arbitration under DE or CA law.', severity: 'Standard', active: true }
];

export function AppProvider({ children }) {
  // Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('pacto-theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pacto-user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return {
      id: 'usr-enterprise-1',
      name: 'Victoria Chen',
      email: 'victoria.chen@pacto.io',
      role: 'General Counsel & VP',
      organization: 'Pacto Enterprise Systems',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    };
  });

  const [isLoading, setIsLoading] = useState(false);

  // Core Data Collections
  const [contracts, setContracts] = useState(INITIAL_CONTRACTS);
  const [playbookRules, setPlaybookRules] = useState(INITIAL_PLAYBOOK);
  const [activeWorkspace, setActiveWorkspace] = useState('Pacto Global Inc. (HQ)');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync theme to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('pacto-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const login = async (email, role = 'user', name = null, id = null) => {
    setIsLoading(true);
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, name }),
      });

      if (resp.ok) {
        const data = await resp.json();
        setUser(data.user);
        localStorage.setItem('pacto-user', JSON.stringify(data.user));
        setIsLoading(false);
        return true;
      }
      
      const fallbackUser = {
        id: id || `usr-${Date.now()}`,
        name: name || (email.includes('admin') ? 'David Sterling (Admin)' : email.split('@')[0]),
        email: email,
        role: role || (email.includes('admin') ? 'admin' : 'user'),
        organization: 'Pacto Enterprise'
      };
      setUser(fallbackUser);
      localStorage.setItem('pacto-user', JSON.stringify(fallbackUser));
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setIsLoading(false);
      return false;
    }
  };

  const loginWithGoogle = async (credentialOrToken) => {
    setIsLoading(true);
    try {
      const resp = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: credentialOrToken }),
      });

      const data = await resp.json();
      if (resp.ok && data.user) {
        setUser(data.user);
        localStorage.setItem('pacto-user', JSON.stringify(data.user));
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: data.error || 'Google login failed' };
      }
    } catch (err) {
      console.error('Google login network error:', err);
      setIsLoading(false);
      return { success: false, error: 'Network error connecting to backend auth.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pacto-user');
  };

  // Helper Methods for Contract Management
  const addContract = (newContract) => {
    const created = {
      id: `ctr-${Date.now()}`,
      status: 'Active',
      effectiveDate: new Date().toISOString().split('T')[0],
      healthScore: Math.floor(Math.random() * 20) + 80,
      riskScore: Math.floor(Math.random() * 30) + 15,
      pnlData: {
        baseRevenue: newContract.value || 500000,
        upsellPotential: 50000,
        infraCost: 120000,
        supportCost: 80000,
        netMargin: 38.5,
        cashFlowTimeline: [
          { month: 'Q1', revenue: (newContract.value || 500000) / 4, expenses: 50000 },
          { month: 'Q2', revenue: (newContract.value || 500000) / 4, expenses: 50000 },
          { month: 'Q3', revenue: (newContract.value || 500000) / 4, expenses: 50000 },
          { month: 'Q4', revenue: (newContract.value || 500000) / 4, expenses: 50000 }
        ]
      },
      clauses: [
        {
          id: `c-${Date.now()}`,
          name: 'Limitation of Liability',
          type: 'Liability',
          text: 'Liability capped at 1.5x contract value.',
          summary: 'Standard 1.5x cap.',
          riskLevel: 'Low',
          policyMatch: true
        }
      ],
      obligations: [],
      ...newContract
    };
    setContracts(prev => [created, ...prev]);
    return created;
  };

  const updateContract = (id, updates) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteContract = (id) => {
    setContracts(prev => prev.filter(c => c.id !== id));
  };

  // Obligation Management
  const addObligation = (contractId, task, owner, dueDate, priority = 'Medium') => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        const newOb = {
          id: `ob-${Date.now()}`,
          task,
          owner,
          dueDate,
          priority,
          status: 'Pending'
        };
        return { ...c, obligations: [...(c.obligations || []), newOb] };
      }
      return c;
    }));
  };

  const toggleObligationStatus = (contractId, obligationId) => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        const updatedObs = c.obligations.map(ob => {
          if (ob.id === obligationId) {
            const nextStatus = ob.status === 'Completed' ? 'Pending' : 'Completed';
            return { ...ob, status: nextStatus };
          }
          return ob;
        });
        return { ...c, obligations: updatedObs };
      }
      return c;
    }));
  };

  // Playbook Rule Management
  const togglePlaybookRule = (id) => {
    setPlaybookRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const addPlaybookRule = (rule) => {
    const newRule = { id: `pb-${Date.now()}`, active: true, ...rule };
    setPlaybookRules(prev => [...prev, newRule]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        login,
        loginWithGoogle,
        logout,
        isLoading,
        contracts,
        addContract,
        updateContract,
        deleteContract,
        playbookRules,
        togglePlaybookRule,
        addPlaybookRule,
        addObligation,
        toggleObligationStatus,
        activeWorkspace,
        setActiveWorkspace,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
