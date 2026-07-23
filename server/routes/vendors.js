const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const AuditLog = require('../models/AuditLog');

const defaultVendors = [
  {
    name: 'Microsoft Azure & M365',
    logo: '🟦',
    category: 'Cloud & Office Suite',
    founded: '1975',
    headquarters: 'Redmond, WA',
    trustScore: 96,
    description: 'Enterprise enterprise cloud computing and productivity infrastructure.',
    complianceJson: JSON.stringify({ SOC2: 'Certified (Type II)', ISO27001: 'Certified', GDPR: 'Compliant', HIPAA: 'BAA Available', DPDP: 'Compliant' }),
    securityJson: JSON.stringify({ Encryption: 'AES-256 at rest & TLS 1.3 in transit', MFA: 'Enforced via Entra ID', SSO: 'SAML 2.0 / OpenID', Pentest: 'Quarterly Third-Party Audits' }),
    termsJson: JSON.stringify({ PrivacyPolicy: 'Microsoft Online Services Terms (OST)', SLA: '99.99% Uptime Guarantee', DataResidency: 'Multi-region local datacenter selection', AIPolicy: 'Customer data NOT used for public AI training' }),
    officialDocs: JSON.stringify({ trustCenter: 'https://www.microsoft.com/trust-center', privacyPortal: 'https://privacy.microsoft.com' }),
  },
  {
    name: 'Google Cloud Platform (GCP)',
    logo: '🌐',
    category: 'Cloud Infrastructure',
    founded: '1998',
    headquarters: 'Mountain View, CA',
    trustScore: 95,
    description: 'Scalable cloud infrastructure, AI models, and enterprise data analytics.',
    complianceJson: JSON.stringify({ SOC2: 'Certified (Type II)', ISO27001: 'Certified', GDPR: 'Compliant', HIPAA: 'BAA Available', DPDP: 'Compliant' }),
    securityJson: JSON.stringify({ Encryption: 'Envelope encryption (KMS)', MFA: 'Required', SSO: 'Google Workspace SSO', Pentest: 'Annual Penetration Testing' }),
    termsJson: JSON.stringify({ PrivacyPolicy: 'Google Cloud Data Protection Terms', SLA: '99.95% to 99.99%', DataResidency: 'Global customer data locations', AIPolicy: 'Enterprise Vertex AI customer data kept private' }),
    officialDocs: JSON.stringify({ trustCenter: 'https://cloud.google.com/trust-center', privacyPortal: 'https://cloud.google.com/privacy' }),
  },
  {
    name: 'Amazon Web Services (AWS)',
    logo: '🟧',
    category: 'Cloud Computing',
    founded: '2006',
    headquarters: 'Seattle, WA',
    trustScore: 97,
    description: 'Global cloud infrastructure provider with extensive compliance certifications.',
    complianceJson: JSON.stringify({ SOC2: 'Certified (Type I & II)', ISO27001: 'Certified', GDPR: 'Compliant', HIPAA: 'BAA Available', DPDP: 'Compliant' }),
    securityJson: JSON.stringify({ Encryption: 'AWS KMS (Hardware Security Modules)', MFA: 'Supported', SSO: 'AWS IAM Identity Center', Pentest: 'Continuous Vulnerability Assessments' }),
    termsJson: JSON.stringify({ PrivacyPolicy: 'AWS Customer Agreement', SLA: '99.99% Regional Availability', DataResidency: 'Strict Region Pinning', AIPolicy: 'Amazon Bedrock opt-out for model training' }),
    officialDocs: JSON.stringify({ trustCenter: 'https://aws.amazon.com/compliance', privacyPortal: 'https://aws.amazon.com/privacy' }),
  },
  {
    name: 'Slack Technologies (Salesforce)',
    logo: '💬',
    category: 'Collaboration',
    founded: '2013',
    headquarters: 'San Francisco, CA',
    trustScore: 92,
    description: 'Enterprise team communication platform with EKM (Enterprise Key Management).',
    complianceJson: JSON.stringify({ SOC2: 'Certified (Type II)', ISO27001: 'Certified', GDPR: 'Compliant', HIPAA: 'BAA Supported', DPDP: 'Compliant' }),
    securityJson: JSON.stringify({ Encryption: 'Slack EKM & TLS 1.2+', MFA: 'Mandatory SSO', SSO: 'SAML / Okta / Azure AD', Pentest: 'Bi-Annual External Pentests' }),
    termsJson: JSON.stringify({ PrivacyPolicy: 'Slack Privacy Policy', SLA: '99.99% Service Level Agreement', DataResidency: 'US, EU, UK, JP datacenters', AIPolicy: 'Slack AI operates on customer workspace context' }),
    officialDocs: JSON.stringify({ trustCenter: 'https://slack.com/trust', privacyPortal: 'https://slack.com/privacy-policy' }),
  },
  {
    name: 'Zoom Video Communications',
    logo: '📹',
    category: 'Video Conferencing',
    founded: '2011',
    headquarters: 'San Jose, CA',
    trustScore: 89,
    description: 'Video communication platform featuring End-to-End Encryption (E2EE).',
    complianceJson: JSON.stringify({ SOC2: 'Certified (Type II)', ISO27001: 'Certified', GDPR: 'Compliant', HIPAA: 'BAA Available', DPDP: 'Compliant' }),
    securityJson: JSON.stringify({ Encryption: '256-bit AES GCM Encryption', MFA: 'Enforced', SSO: 'SAML 2.0', Pentest: 'Third-party Bug Bounty Program' }),
    termsJson: JSON.stringify({ PrivacyPolicy: 'Zoom Terms of Service', SLA: '99.9% Uptime Commitment', DataResidency: 'Custom Routing Selection', AIPolicy: 'Explicit Opt-In for AI features' }),
    officialDocs: JSON.stringify({ trustCenter: 'https://zoom.us/trust', privacyPortal: 'https://zoom.us/privacy' }),
  },
];

// GET all vendors (seeds default if empty)
router.get('/', async (req, res) => {
  try {
    let vendors = await Vendor.find();
    if (vendors.length === 0) {
      vendors = await Vendor.insertMany(defaultVendors);
    }
    return res.json(vendors);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

// Search vendor or record search query in MongoDB
router.post('/search-log', async (req, res) => {
  try {
    const { query, userId, userEmail } = req.body;
    if (query) {
      await AuditLog.create({
        userId: userId || null,
        userEmail: userEmail || 'anonymous@clauseiq.com',
        action: 'SEARCH_VENDOR',
        details: `Searched vendor matrix for "${query}".`,
      });
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to log search' });
  }
});

module.exports = router;
