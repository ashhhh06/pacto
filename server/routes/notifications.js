const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');

router.use(protect);

// GET all notifications for an organization
router.get('/', async (req, res) => {
  try {
    const organizationId = req.user?.organizationId || req.query.organizationId;

    if (!organizationId) {
      return res.status(400).json({ error: 'Organization ID is required' });
    }

    const notifications = await Notification.find({ organizationId })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.json(notifications);
  } catch (err) {
    console.error('Fetch Notifications Error:', err);
    return res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// PUT mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  } catch (err) {
    console.error('Update Notification Error:', err);
    return res.status(500).json({ error: 'Failed to update notification' });
  }
});

module.exports = router;
