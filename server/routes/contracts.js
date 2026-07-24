const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');
const Notification = require('../models/Notification');
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

const { protect } = require('../middleware/auth');

// Apply protection to all contract routes
router.use(protect);

// GET all contracts for an organization
router.get('/', async (req, res) => {
  try {
    const organizationId = req.user?.organizationId || req.query.organizationId;
    if (!organizationId) {
      return res.status(400).json({ error: 'Organization ID is required' });
    }
    const query = { organizationId };
    const contracts = await Contract.find(query).sort({ createdAt: -1 });
    return res.json(contracts);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch contracts' });
  }
});

// POST analyze contract and save to MongoDB
router.post('/analyze', async (req, res) => {
  try {
    const { title, contentText, category, userId, userEmail, owner, value } = req.body;
    const organizationId = req.user?.organizationId || req.body.organizationId;
    const workspaceId = req.user?.workspaceId || req.body.workspaceId;

    if (!contentText || contentText.trim().length === 0) {
      return res.status(400).json({ error: 'Contract text is required' });
    }

    if (!organizationId) {
      return res.status(400).json({ error: 'Organization ID is required to associate contract' });
    }

    const contractTitle = title || 'Draft Contract Analysis';
    const contractCategory = category || 'NDA';
    const contractValue = Number(value) || 500000;

    const analysisResult = analyzeContractText(contentText, contractTitle, contractCategory);

    const contract = await Contract.create({
      organizationId,
      workspaceId: workspaceId || null,
      title: contractTitle,
      contentText,
      category: contractCategory,
      status: 'Active',
      owner: owner || req.user?.email || 'Legal Team',
      value: contractValue,
      expectedRevenue: Math.round(contractValue * 0.9),
      estimatedProfit: Math.round(contractValue * 0.35),
      profitMargin: 35.5,
      riskScore: analysisResult.riskScore,
      metadataJson: analysisResult.metadataJson,
      analysesJson: analysisResult.analysesJson,
      userId: req.user?.id || userId || null,
      obligations: [
        {
          id: `ob-${Date.now()}-1`,
          task: 'Quarterly Security Vulnerability Audit',
          owner: 'Security Lead',
          dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
          priority: 'High',
          status: 'Pending'
        },
        {
          id: `ob-${Date.now()}-2`,
          task: 'SLA Performance & Uptime Verification',
          owner: 'DevOps Manager',
          dueDate: new Date(Date.now() + 60*24*60*60*1000).toISOString().split('T')[0],
          priority: 'Medium',
          status: 'Pending'
        }
      ]
    });

    // Create Notification
    await Notification.create({
      organizationId,
      userId: req.user?.id || userId || null,
      title: 'New Contract Analyzed',
      message: `Contract "${contractTitle}" analyzed with risk score ${analysisResult.riskScore}/100.`,
      type: 'CONTRACT_CREATED'
    });

    // Log to MongoDB AuditLog
    await AuditLog.create({
      userId: req.user?.id || userId || null,
      userEmail: req.user?.email || userEmail || 'user@pacto.com',
      action: 'UPLOAD_CONTRACT',
      details: `Analyzed contract "${contractTitle}" (${contractCategory}) - Risk Score: ${analysisResult.riskScore}/100.`,
    });

    return res.json(contract);
  } catch (err) {
    console.error('Contract Analysis Error:', err);
    return res.status(500).json({ error: 'Failed to analyze contract' });
  }
});

// PUT update contract details (Lifecycle Status, Title, Category, Owner, Value, RiskScore)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const contract = await Contract.findById(id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    if (contract.organizationId.toString() !== req.user?.organizationId?.toString()) {
      return res.status(403).json({ error: 'Unauthorized to update contracts outside your organization' });
    }

    if (updates.title !== undefined) contract.title = updates.title;
    if (updates.category !== undefined) contract.category = updates.category;
    if (updates.status !== undefined) contract.status = updates.status;
    if (updates.owner !== undefined) contract.owner = updates.owner;
    if (updates.value !== undefined) {
      contract.value = Number(updates.value);
      contract.expectedRevenue = Math.round(contract.value * 0.9);
      contract.estimatedProfit = Math.round(contract.value * 0.35);
    }
    if (updates.riskScore !== undefined) contract.riskScore = Number(updates.riskScore);
    if (updates.autoRenewal !== undefined) contract.autoRenewal = Boolean(updates.autoRenewal);

    await contract.save();

    // Log Audit Log
    await AuditLog.create({
      userId: req.user?.id,
      userEmail: req.user?.email,
      action: 'CONTRACT_UPDATED',
      details: `Updated contract "${contract.title}" - Status: ${contract.status}, Owner: ${contract.owner}.`,
    });

    return res.json(contract);
  } catch (err) {
    console.error('Update Contract Error:', err);
    return res.status(500).json({ error: 'Failed to update contract' });
  }
});

// POST add obligation task to contract
router.post('/:id/obligations', async (req, res) => {
  try {
    const { id } = req.params;
    const { task, owner, dueDate, priority } = req.body;

    const contract = await Contract.findById(id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    const newOb = {
      id: `ob-${Date.now()}`,
      task: task || 'New Obligation Deliverable',
      owner: owner || 'Legal Lead',
      dueDate: dueDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      priority: priority || 'High',
      status: 'Pending'
    };

    contract.obligations.push(newOb);
    await contract.save();

    return res.json(contract);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to add obligation task' });
  }
});

// PUT toggle obligation task status
router.put('/:id/obligations/:obId/toggle', async (req, res) => {
  try {
    const { id, obId } = req.params;
    const contract = await Contract.findById(id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    const ob = contract.obligations.find(o => o.id === obId || o._id.toString() === obId);
    if (ob) {
      ob.status = ob.status === 'Completed' ? 'Pending' : 'Completed';
      await contract.save();
    }

    return res.json(contract);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to toggle obligation status' });
  }
});

// POST compare two contracts side-by-side
router.post('/compare', async (req, res) => {
  try {
    const { contractA, contractB, titleA, titleB } = req.body;

    if (!contractA || !contractB) {
      return res.status(400).json({ error: 'Both Contract A and Contract B are required for comparison.' });
    }

    const analysisA = analyzeContractText(contractA, titleA || 'Version A', 'MSA');
    const analysisB = analyzeContractText(contractB, titleB || 'Version B', 'MSA');

    const metaA = JSON.parse(analysisA.metadataJson);
    const metaB = JSON.parse(analysisB.metadataJson);

    const differences = [
      {
        feature: 'Limitation of Liability',
        versionA: metaA.liabilityCap,
        versionB: metaB.liabilityCap,
        changed: metaA.liabilityCap !== metaB.liabilityCap,
        impact: metaB.liabilityCap === 'Uncapped' ? 'Higher Risk in Version B' : 'Lower Risk in Version A',
      },
      {
        feature: 'Term Duration',
        versionA: metaA.termDuration,
        versionB: metaB.termDuration,
        changed: metaA.termDuration !== metaB.termDuration,
        impact: 'Term duration extended in Version B',
      },
      {
        feature: 'Governing Law',
        versionA: metaA.governingLaw,
        versionB: metaB.governingLaw,
        changed: metaA.governingLaw !== metaB.governingLaw,
        impact: 'Jurisdiction modified in Version B',
      },
      {
        feature: 'Risk Score Index',
        versionA: `${analysisA.riskScore}/100`,
        versionB: `${analysisB.riskScore}/100`,
        changed: analysisA.riskScore !== analysisB.riskScore,
        impact: analysisB.riskScore > analysisA.riskScore ? `Version B is ${analysisB.riskScore - analysisA.riskScore} points higher risk` : 'Version A has higher risk score',
      },
    ];

    const comparisonResult = {
      summary: `Pacto Contract Engine evaluated both versions. Version A scored ${analysisA.riskScore}/100 vs Version B at ${analysisB.riskScore}/100.`,
      contractA: { title: titleA || 'Contract Version A', text: contractA, riskScore: analysisA.riskScore, meta: metaA },
      contractB: { title: titleB || 'Contract Version B', text: contractB, riskScore: analysisB.riskScore, meta: metaB },
      differences,
    };

    if (req.user?.organizationId) {
      await AuditLog.create({
        userId: req.user.id,
        userEmail: req.user.email,
        action: 'COMPARE_CONTRACTS',
        details: `Compared "${titleA || 'Version A'}" vs "${titleB || 'Version B'}" - Risk diff: ${analysisA.riskScore} vs ${analysisB.riskScore}.`,
      });
    }

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
    const contract = await Contract.findById(id);
    if (contract && contract.organizationId.toString() !== req.user?.organizationId?.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete contract outside your organization' });
    }
    await Contract.findByIdAndDelete(id);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete contract' });
  }
});

module.exports = router;

