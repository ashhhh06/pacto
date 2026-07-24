import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

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
    return null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('pacto-token') || null;
  });

  const [activeWorkspace, setActiveWorkspace] = useState('Main Enterprise Workspace');
  const [isLoading, setIsLoading] = useState(false);

  // Enterprise Data Collections (Synchronized from MongoDB)
  const [contracts, setContracts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [notifications, setNotifications] = useState([]);
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

  // Helper for Authorization Headers
  const getAuthHeaders = useCallback(() => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }, [token]);

  // Synchronize Contracts from MongoDB for logged-in organization
  const fetchContracts = useCallback(async (orgId) => {
    if (!orgId) return;
    try {
      const resp = await fetch(`/api/contracts?organizationId=${orgId}`, {
        headers: getAuthHeaders()
      });
      if (resp.ok) {
        const data = await resp.json();
        const parsedContracts = data.map(c => {
          let meta = {};
          let analyses = {};
          try { meta = JSON.parse(c.metadataJson || '{}'); } catch(e) {}
          try { analyses = JSON.parse(c.analysesJson || '{}'); } catch(e) {}
          
          const val = c.value || 500000;
          const risk = c.riskScore || 20;

          return {
            id: c._id,
            _id: c._id,
            title: c.title,
            client: meta.parties?.[1] || c.title.split('-')[1]?.trim() || 'Enterprise Client',
            category: c.category || 'Sales',
            type: c.category || 'MSA',
            status: c.status || 'Active',
            owner: c.owner || 'Legal Team',
            effectiveDate: meta.effectiveDate || new Date(c.createdAt).toISOString().split('T')[0],
            expiryDate: new Date(new Date(c.createdAt).getTime() + 365*24*60*60*1000).toISOString().split('T')[0],
            renewalDate: new Date(new Date(c.createdAt).getTime() + 300*24*60*60*1000).toISOString().split('T')[0],
            governingLaw: meta.governingLaw || 'Delaware, USA',
            paymentTerms: meta.paymentTerms || 'Monthly Net 30',
            noticePeriodDays: 60,
            autoRenewal: c.autoRenewal !== undefined ? c.autoRenewal : true,
            riskScore: risk,
            healthScore: Math.max(10, 100 - risk),
            value: val,
            annualValue: val,
            expectedRevenue: c.expectedRevenue || Math.round(val * 0.9),
            estimatedProfit: c.estimatedProfit || Math.round(val * 0.35),
            profitMargin: c.profitMargin || 35.5,
            parties: { client: meta.parties?.[0] || 'Provider', vendor: meta.parties?.[1] || 'Client' },
            executiveSummary: analyses.executiveSummary || `Parsed agreement scoring ${risk}/100 risk score based on standard liability and confidentiality terms.`,
            riskDetails: analyses.riskScoreDetails || [],
            missingClauses: (analyses.missingClauses || []).map(m => m.name || m),
            clauses: [
              { id: 'cl-1', name: 'Limitation of Liability', riskLevel: risk > 50 ? 'High' : 'Low', text: `Liability cap set at ${meta.liabilityCap || '2x Annual Fees'}.` },
              { id: 'cl-2', name: 'IP Ownership Rights', riskLevel: 'Low', text: 'Provider retains 100% background IP and core AI model rights.' },
              { id: 'cl-3', name: 'Confidentiality & Non-Disclosure', riskLevel: 'Low', text: 'Mutual NDA term enforceable for 3+ years.' }
            ],
            obligations: c.obligations || [
              { id: `ob-${c._id}-1`, task: 'Quarterly Security Vulnerability Audit', owner: c.owner || 'Security Lead', dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0], priority: 'High', status: 'Pending' }
            ],
            contentText: c.contentText,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt || c.createdAt
          };
        });
        setContracts(parsedContracts);
      }
    } catch (err) {
      console.error('Failed to fetch contracts from MongoDB:', err);
    }
  }, [getAuthHeaders]);

  // Synchronize Team Members from MongoDB
  const fetchTeam = useCallback(async (orgId) => {
    if (!orgId) return;
    try {
      const resp = await fetch(`/api/team?organizationId=${orgId}`, {
        headers: getAuthHeaders()
      });
      if (resp.ok) {
        const data = await resp.json();
        setTeamMembers(data.members || []);
      }
    } catch (err) {
      console.error('Failed to fetch team members from MongoDB:', err);
    }
  }, [getAuthHeaders]);

  // Synchronize Notifications from MongoDB
  const fetchNotifications = useCallback(async (orgId) => {
    if (!orgId) return;
    try {
      const resp = await fetch(`/api/notifications?organizationId=${orgId}`, {
        headers: getAuthHeaders()
      });
      if (resp.ok) {
        const data = await resp.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error('Failed to fetch notifications from MongoDB:', err);
    }
  }, [getAuthHeaders]);

  // Auto-fetch data on user login or organization change
  useEffect(() => {
    if (user?.organizationId) {
      setActiveWorkspace(user.organizationName || 'Main Enterprise Workspace');
      fetchContracts(user.organizationId);
      fetchTeam(user.organizationId);
      fetchNotifications(user.organizationId);
    } else {
      setContracts([]);
      setTeamMembers([]);
      setNotifications([]);
    }
  }, [user?.organizationId, fetchContracts, fetchTeam, fetchNotifications]);

  // Auth: Register (Owner or Invited User)
  const register = async (formData, inviteToken = null) => {
    setIsLoading(true);
    try {
      const resp = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, inviteToken }),
      });

      const data = await resp.json();
      if (resp.ok && data.user) {
        setUser(data.user);
        if (data.token) {
          setToken(data.token);
          localStorage.setItem('pacto-token', data.token);
        }
        localStorage.setItem('pacto-user', JSON.stringify(data.user));
        setIsLoading(false);
        return { success: true, user: data.user };
      } else {
        setIsLoading(false);
        return { success: false, error: data.error || 'Registration failed.' };
      }
    } catch (err) {
      console.error('Register network error:', err);
      setIsLoading(false);
      return { success: false, error: 'Network error during registration.' };
    }
  };

  // Auth: Login
  const login = async (email, inviteToken = null) => {
    setIsLoading(true);
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, inviteToken }),
      });

      const data = await resp.json();
      if (resp.ok && data.user) {
        setUser(data.user);
        if (data.token) {
          setToken(data.token);
          localStorage.setItem('pacto-token', data.token);
        }
        localStorage.setItem('pacto-user', JSON.stringify(data.user));
        setIsLoading(false);
        return { success: true, user: data.user };
      } else {
        setIsLoading(false);
        return { success: false, error: data.error || 'Sign in failed.' };
      }
    } catch (err) {
      console.error('Login error:', err);
      setIsLoading(false);
      return { success: false, error: 'Network error during sign in.' };
    }
  };

  // Auth: Google Sign In
  const loginWithGoogle = async (credentialOrToken, inviteToken = null) => {
    setIsLoading(true);
    try {
      const resp = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: credentialOrToken, inviteToken }),
      });

      const data = await resp.json();
      if (resp.ok && data.user) {
        setUser(data.user);
        if (data.token) {
          setToken(data.token);
          localStorage.setItem('pacto-token', data.token);
        }
        localStorage.setItem('pacto-user', JSON.stringify(data.user));
        setIsLoading(false);
        return { success: true, user: data.user };
      } else {
        setIsLoading(false);
        return { success: false, error: data.error || 'Google login failed.' };
      }
    } catch (err) {
      console.error('Google login network error:', err);
      setIsLoading(false);
      return { success: false, error: 'Network error during Google Auth.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('pacto-user');
    localStorage.removeItem('pacto-token');
    setContracts([]);
    setTeamMembers([]);
    setNotifications([]);
  };

  // Team Management Methods
  const inviteMember = async (email, role) => {
    if (!user?.organizationId) return { success: false, error: 'No organization session.' };
    try {
      const resp = await fetch('/api/team/invite', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          email,
          role,
          organizationId: user.organizationId,
          workspaceId: user.workspaceId,
          invitedBy: user.name
        }),
      });

      const data = await resp.json();
      if (resp.ok) {
        fetchTeam(user.organizationId);
        fetchNotifications(user.organizationId);
        return { success: true, ...data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Network error issuing invitation.' };
    }
  };

  const updateMemberRole = async (userId, role) => {
    if (!user?.organizationId) return;
    try {
      const resp = await fetch(`/api/team/member/${userId}/role`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ role, organizationId: user.organizationId }),
      });
      if (resp.ok) {
        fetchTeam(user.organizationId);
        fetchNotifications(user.organizationId);
      }
    } catch (err) {
      console.error('Error updating member role:', err);
    }
  };

  const removeMember = async (userId) => {
    if (!user?.organizationId) return;
    try {
      const resp = await fetch(`/api/team/member/${userId}?organizationId=${user.organizationId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (resp.ok) {
        fetchTeam(user.organizationId);
        fetchNotifications(user.organizationId);
      }
    } catch (err) {
      console.error('Error removing member:', err);
    }
  };

  const revokeInvite = async (inviteId) => {
    try {
      const resp = await fetch(`/api/team/invite/${inviteId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (resp.ok && user?.organizationId) {
        fetchTeam(user.organizationId);
      }
    } catch (err) {
      console.error('Error revoking invitation:', err);
    }
  };

  const markNotificationRead = async (id) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error('Error marking notification read:', err);
    }
  };

  // Contract Methods
  const addContract = async (newContract) => {
    if (!user?.organizationId) return null;
    try {
      const resp = await fetch('/api/contracts/analyze', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: newContract.title,
          contentText: newContract.contentText || newContract.text || 'Standard contract agreement body text.',
          category: newContract.category || newContract.type || 'NDA',
          owner: newContract.owner || user.email,
          value: newContract.value || 500000,
          userId: user.id,
          userEmail: user.email,
          organizationId: user.organizationId,
          workspaceId: user.workspaceId
        }),
      });

      if (resp.ok) {
        const createdContract = await resp.json();
        await fetchContracts(user.organizationId);
        await fetchNotifications(user.organizationId);
        return createdContract;
      }
    } catch (err) {
      console.error('Error creating contract:', err);
    }
    return null;
  };

  const editContract = async (contractId, updateFields) => {
    try {
      const resp = await fetch(`/api/contracts/${contractId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateFields)
      });
      if (resp.ok && user?.organizationId) {
        fetchContracts(user.organizationId);
      }
    } catch (err) {
      console.error('Error editing contract:', err);
    }
  };

  const updateContractStatus = async (contractId, newStatus) => {
    await editContract(contractId, { status: newStatus });
  };

  const deleteContract = async (id) => {
    try {
      const resp = await fetch(`/api/contracts/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (resp.ok && user?.organizationId) {
        fetchContracts(user.organizationId);
      }
    } catch (err) {
      console.error('Error deleting contract:', err);
    }
  };

  const addObligation = async (contractId, task, owner, dueDate, priority) => {
    try {
      const resp = await fetch(`/api/contracts/${contractId}/obligations`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ task, owner, dueDate, priority })
      });
      if (resp.ok && user?.organizationId) {
        fetchContracts(user.organizationId);
      }
    } catch (err) {
      console.error('Error adding obligation:', err);
    }
  };

  const toggleObligationStatus = async (contractId, obId) => {
    try {
      const resp = await fetch(`/api/contracts/${contractId}/obligations/${obId}/toggle`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      if (resp.ok && user?.organizationId) {
        fetchContracts(user.organizationId);
      }
    } catch (err) {
      console.error('Error toggling obligation status:', err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        token,
        register,
        login,
        loginWithGoogle,
        logout,
        activeWorkspace,
        setActiveWorkspace,
        isLoading,
        contracts,
        addContract,
        editContract,
        updateContractStatus,
        deleteContract,
        addObligation,
        toggleObligationStatus,
        teamMembers,
        fetchTeam,
        inviteMember,
        updateMemberRole,
        removeMember,
        revokeInvite,
        notifications,
        markNotificationRead,
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
