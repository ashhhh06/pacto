const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
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
  riskScore: {
    type: Number,
    default: 0,
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
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contract', contractSchema);
