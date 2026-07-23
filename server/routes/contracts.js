const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');
const AuditLog = require('../models/AuditLog');

// Helper to calculate risk score & analyze contract content
function analyzeContractText(text, title, category) {
  const contentLower = text.toLowerCase();
  let riskScore = 20; // baseline
  const missingClauses = [];
  const riskDetails = [];
  const negotiationPoints = [];

  // Check key risk factors
  if (contentLower.includes('unlimited liability') || contentLower.includes('no cap on liability')) {
    riskScore += 35;
    riskDetails.push({ clause: 'Limitation of Liability', risk: 'HIGH', note: 'Contains uncapped liability exposure.' });
    negotiationPoints.push('Cap overall liability at 1x to 2x Annual Contract Value (ACV).');
  } else if (!contentLower.includes('liability')) {
    riskScore += 20;
    missingClauses.push({ name: 'Limitation of Liability', severity: 'CRITICAL', recommendation: 'Add standard liability cap clause.' });
  }

  if (contentLower.includes('perpetual') || contentLower.includes('irrevocable license')) {
    riskScore += 25;
    riskDetails.push({ clause: 'IP Rights', risk: 'MEDIUM', note: 'Grants perpetual irrevocable license to provider.' });
    negotiationPoints.push('Restrict IP rights strictly to service delivery duration.');
  }

  if (contentLower.includes('auto-renew') || contentLower.includes('automatic renewal')) {
    riskScore += 15;
    riskDetails.push({ clause: 'Term & Termination', risk: 'MEDIUM', note: 'Contains automatic renewal clause.' });
    negotiationPoints.push('Require at least 60 days written notice prior to non-renewal.');
  }

  if (!contentLower.includes('confidentiality') && !contentLower.includes('confidential')) {
    riskScore += 25;
    missingClauses.push({ name: 'Confidentiality Protection', severity: 'HIGH', recommendation: 'Include mutual non-disclosure protections.' });
  }

  if (!contentLower.includes('governing law') && !contentLower.includes('jurisdiction')) {
    missingClauses.push({ name: 'Governing Law', severity: 'MEDIUM', recommendation: 'Specify applicable legal jurisdiction.' });
  }

  if (!contentLower.includes('gdpr') && !contentLower.includes('data protection')) {
    missingClauses.push({ name: 'Data Protection Addendum (DPA)', severity: 'HIGH', recommendation: 'Add GDPR/DPDP compliant data processing terms.' });
  }

  // Bound risk score between 0 and 100
  const finalRiskScore = Math.min(100, Math.max(5, riskScore));

  const metadata = {
    parties: ['Party A (Client)', 'Party B (Vendor)'],
    effectiveDate: new Date().toISOString().split('T')[0],
    termDuration: contentLower.includes('24-month') ? '24 Months' : '12 Months',
    governingLaw: contentLower.includes('delaware') ? 'Delaware, USA' : 'California, USA',
    liabilityCap: contentLower.includes('unlimited') ? 'Uncapped' : '$1,000,000 USD',
  };

  const analyses = {
    executiveSummary: `Analysis of "${title}" (${category}): Contract scored a risk index of ${finalRiskScore}/100 based on automated parsing of liability, termination, and data privacy clauses.`,
    riskScoreDetails: riskDetails.length > 0 ? riskDetails : [{ clause: 'Standard Terms', risk: 'LOW', note: 'No severe risk triggers detected.' }],
    negotiationPoints: negotiationPoints.length > 0 ? negotiationPoints : ['Confirm standard 30-day payment terms.'],
    missingClauses: missingClauses,
  };

  return {
    riskScore: finalRiskScore,
    metadataJson: JSON.stringify(metadata),
    analysesJson: JSON.stringify(analyses),
  };
}

// GET all contracts
router.get('/', async (req, res) => {
  try {
    const contracts = await Contract.find().sort({ createdAt: -1 });
    return res.json(contracts);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch contracts' });
  }
});

// POST analyze contract and save to MongoDB
router.post('/analyze', async (req, res) => {
  try {
    const { title, contentText, category, userId, userEmail } = req.body;

    if (!contentText || contentText.trim().length === 0) {
      return res.status(400).json({ error: 'Contract text is required' });
    }

    const contractTitle = title || 'Draft Contract Analysis';
    const contractCategory = category || 'NDA';

    const analysisResult = analyzeContractText(contentText, contractTitle, contractCategory);

    const contract = await Contract.create({
      title: contractTitle,
      contentText,
      category: contractCategory,
      riskScore: analysisResult.riskScore,
      metadataJson: analysisResult.metadataJson,
      analysesJson: analysisResult.analysesJson,
      userId: userId || null,
    });

    // Log to MongoDB AuditLog
    await AuditLog.create({
      userId: userId || null,
      userEmail: userEmail || 'anonymous@pacto.com',
      action: 'UPLOAD_CONTRACT',
      details: `Analyzed contract "${contractTitle}" (${contractCategory}) - Risk Score: ${analysisResult.riskScore}/100.`,
    });

    return res.json(contract);
  } catch (err) {
    console.error('Contract Analysis Error:', err);
    return res.status(500).json({ error: 'Failed to analyze contract' });
  }
});

// POST compare two contracts side-by-side
router.post('/compare', async (req, res) => {
  try {
    const { contractA, contractB, titleA, titleB, userId, userEmail } = req.body;

    if (!contractA || !contractB) {
      return res.status(400).json({ error: 'Both Contract A and Contract B are required for comparison.' });
    }

    const analysisA = analyzeContractText(contractA, titleA || 'Version A', 'MSA');
    const analysisB = analyzeContractText(contractB, titleB || 'Version B', 'MSA');

    const metaA = JSON.parse(analysisA.metadataJson);
    const metaB = JSON.parse(analysisB.metadataJson);

    // Differences calculation
    const differences = [
      {
        feature: 'Limitation of Liability',
        versionA: metaA.liabilityCap,
        versionB: metaB.liabilityCap,
        changed: metaA.liabilityCap !== metaB.liabilityCap,
        impact: metaB.liabilityCap === 'Uncapped' ? 'HIGH RISK IN VERSION B' : 'LOWER RISK IN VERSION A',
      },
      {
        feature: 'Term Duration',
        versionA: metaA.termDuration,
        versionB: metaB.termDuration,
        changed: metaA.termDuration !== metaB.termDuration,
        impact: 'Term extended in Version B',
      },
      {
        feature: 'Governing Law',
        versionA: metaA.governingLaw,
        versionB: metaB.governingLaw,
        changed: metaA.governingLaw !== metaB.governingLaw,
        impact: 'Jurisdiction modified',
      },
      {
        feature: 'Risk Score',
        versionA: `${analysisA.riskScore}/100`,
        versionB: `${analysisB.riskScore}/100`,
        changed: analysisA.riskScore !== analysisB.riskScore,
        impact: analysisB.riskScore > analysisA.riskScore ? `Version B is ${analysisB.riskScore - analysisA.riskScore} points higher risk` : 'Version A has higher risk score',
      },
    ];

    const comparisonResult = {
      summary: `Pacto AI Comparison Engine evaluated both versions. Version A scored ${analysisA.riskScore}/100 vs Version B at ${analysisB.riskScore}/100.`,
      contractA: { title: titleA || 'Contract Version A', text: contractA, riskScore: analysisA.riskScore, meta: metaA },
      contractB: { title: titleB || 'Contract Version B', text: contractB, riskScore: analysisB.riskScore, meta: metaB },
      differences,
    };

    // Log audit
    await AuditLog.create({
      userId: userId || null,
      userEmail: userEmail || 'anonymous@pacto.com',
      action: 'COMPARE_CONTRACTS',
      details: `Compared "${titleA || 'Version A'}" vs "${titleB || 'Version B'}" - Risk diff: ${analysisA.riskScore} vs ${analysisB.riskScore}.`,
    });

    return res.json(comparisonResult);
  } catch (err) {
    console.error('Contract Comparison Error:', err);
    return res.status(500).json({ error: 'Failed to compare contracts' });
  }
});

// DELETE contract by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Contract.findByIdAndDelete(id);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete contract' });
  }
});

module.exports = router;
