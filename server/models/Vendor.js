const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    default: '🏢',
  },
  category: {
    type: String,
    required: true,
  },
  founded: {
    type: String,
    default: 'N/A',
  },
  headquarters: {
    type: String,
    default: 'N/A',
  },
  trustScore: {
    type: Number,
    default: 90,
  },
  description: {
    type: String,
    default: '',
  },
  complianceJson: {
    type: String, // Stringified object for SOC2, ISO27001, GDPR, HIPAA, DPDP
    default: '{}',
  },
  securityJson: {
    type: String, // Stringified object for Encryption, MFA, SSO, Pentest
    default: '{}',
  },
  termsJson: {
    type: String, // Stringified object for Privacy Policy, SLA, Data Residency, AI Policy
    default: '{}',
  },
  officialDocs: {
    type: String, // Stringified object for official links
    default: '{}',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Vendor', vendorSchema);
