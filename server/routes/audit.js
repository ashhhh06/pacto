const express = require('express');
const router = express.Router();
const AuditLog = require('../models/AuditLog');
const { protect } = require('../middleware/auth');

router.use(protect);

// GET all audit logs (sorted newest first)
router.get('/', async (req, res) => {
  try {
    const query = req.user?.organizationId ? { organizationId: req.user.organizationId } : {};
    const logs = await AuditLog.find(query).sort({ createdAt: -1 }).limit(100);
    return res.json(logs);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

// POST new audit log entry
router.post('/', async (req, res) => {
  try {
    const { userId, userEmail, action, details, ipAddress } = req.body;
    
    if (!action) {
      return res.status(400).json({ error: 'Action is required' });
    }

    const log = await AuditLog.create({
      userId: userId || null,
      userEmail: userEmail || 'anonymous@clauseiq.com',
      action,
      details: details || '',
      ipAddress: ipAddress || req.ip || '127.0.0.1',
    });

    return res.json(log);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to record audit log' });
  }
});

module.exports = router;
