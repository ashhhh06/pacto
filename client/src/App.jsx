import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import LandingPage from './pages/LandingPage';
import PlatformPage from './pages/PlatformPage';
import FeaturesPage from './pages/FeaturesPage';
import SolutionsPage from './pages/SolutionsPage';
import PricingPage from './pages/PricingPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Authenticated Workspace Pages
import DashboardLayout from './pages/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import ContractAnalyzer from './pages/ContractAnalyzer';
import AIContractReview from './pages/AIContractReview';
import BusinessIntelligenceSimulator from './pages/BusinessIntelligenceSimulator';
import AIContractBuilder from './pages/AIContractBuilder';
import ClauseLibrary from './pages/ClauseLibrary';
import ContractComparison from './pages/ContractComparison';
import CompanyPlaybook from './pages/CompanyPlaybook';
import ObligationTracker from './pages/ObligationTracker';
import RenewalIntelligence from './pages/RenewalIntelligence';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import TeamWorkspace from './pages/TeamWorkspace';
import SettingsPage from './pages/SettingsPage';

// Admin Control Panel Pages
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminAIUsage from './pages/admin/AdminAIUsage';
import AdminSubscriptions from './pages/admin/AdminSubscriptions';
import AdminContactRequests from './pages/admin/AdminContactRequests';

const GOOGLE_CLIENT_ID = "269444227959-bcpep88m4nt71orjffg73kc3rdlt7bpi.apps.googleusercontent.com";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            
            <Routes>
              {/* ADMIN PANEL ROUTES (Uses AdminLayout without main Navbar/Footer) */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserDirectoryWrapper />} />
                <Route path="templates" element={<AdminTemplates />} />
                <Route path="ai-usage" element={<AdminAIUsage />} />
                <Route path="subscriptions" element={<AdminSubscriptions />} />
                <Route path="contact-requests" element={<AdminContactRequests />} />
              </Route>

              {/* ALL OTHER ROUTES (Uses Navbar & Footer) */}
              <Route
                path="*"
                element={
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <div className="flex-1">
                      <Routes>
                        {/* Public Website */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/platform" element={<PlatformPage />} />
                        <Route path="/features" element={<FeaturesPage />} />
                        <Route path="/solutions" element={<SolutionsPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/resources" element={<ResourcesPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Authenticated Workspace Platform */}
                        <Route path="/dashboard" element={<DashboardLayout />}>
                          <Route index element={<DashboardOverview />} />
                          <Route path="contracts" element={<ContractAnalyzer />} />
                          <Route path="ai-review" element={<AIContractReview />} />
                          <Route path="bi-simulator" element={<BusinessIntelligenceSimulator />} />
                          <Route path="builder" element={<AIContractBuilder />} />
                          <Route path="clause-library" element={<ClauseLibrary />} />
                          <Route path="negotiation" element={<ContractComparison />} />
                          <Route path="playbook" element={<CompanyPlaybook />} />
                          <Route path="obligations" element={<ObligationTracker />} />
                          <Route path="renewals" element={<RenewalIntelligence />} />
                          <Route path="analytics" element={<AnalyticsPage />} />
                          <Route path="reports" element={<ReportsPage />} />
                          <Route path="team" element={<TeamWorkspace />} />
                          <Route path="settings" element={<SettingsPage />} />
                        </Route>
                      </Routes>
                    </div>
                    <Footer />
                  </div>
                }
              />
            </Routes>

          </div>
        </BrowserRouter>
      </AppProvider>
    </GoogleOAuthProvider>
  );
}

function UserDirectoryWrapper() {
  return <AdminUsers />;
}
