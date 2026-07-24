const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  contentText: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'NDA',
  },
  status: {
    type: String,
    enum: ['Draft', 'Under Review', 'Approved', 'Active', 'Expired', 'Archived'],
    default: 'Active',
  },
  owner: {
    type: String,
    default: 'Legal Team',
  },
  value: {
    type: Number,
    default: 500000,
  },
  expectedRevenue: {
    type: Number,
    default: 450000,
  },
  estimatedProfit: {
    type: Number,
    default: 160000,
  },
  profitMargin: {
    type: Number,
    default: 35.5,
  },
  autoRenewal: {
    type: Boolean,
    default: false,
  },
  obligations: [{
    id: String,
    task: String,
    owner: String,
    dueDate: String,
    priority: { type: String, default: 'High' },
    status: { type: String, default: 'Pending' }
  }],
  riskScore: {
    type: Number,
    default: 20,
  },
  metadataJson: {
    type: String, // Stringified JSON of parties, dates, governing law, values
    default: '{}',
  },
  analysesJson: {
    type: String, // Stringified JSON of executiveSummary, riskScoreDetails, negotiationPoints, missingClauses
    default: '{}',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contract', contractSchema);
