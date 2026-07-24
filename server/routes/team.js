const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');
const Organization = require('../models/Organization');
const Workspace = require('../models/Workspace');
const Membership = require('../models/Membership');
const Invitation = require('../models/Invitation');
const Notification = require('../models/Notification');
const AuditLog = require('../models/AuditLog');
const { protect } = require('../middleware/auth');

// Apply JWT Protection to team routes
router.use(protect);

// Helper to generate initials avatar URL
function generateAvatar(name, email) {
  const cleanName = (name || email || 'User').trim();
  const initials = cleanName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=ffffff&bold=true`;
}

// GET all team members and pending invitations for an organization
router.get('/', async (req, res) => {
  try {
    const organizationId = req.user?.organizationId || req.query.organizationId;

    if (!organizationId) {
      return res.status(400).json({ error: 'Organization ID is required' });
    }

    const org = await Organization.findById(organizationId);
    if (!org) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    // Active members in organization
    const activeUsers = await User.find({ organizationId }).sort({ createdAt: 1 });

    // Pending invitations for organization
    const pendingInvites = await Invitation.find({
      organizationId,
      status: 'Pending',
      expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    const members = activeUsers.map(u => ({
      id: u._id.toString(),
      _id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status === 'Active' ? 'Active Member' : u.status,
      avatar: u.avatar || generateAvatar(u.name, u.email),
      joinedDate: u.createdAt,
      lastActive: u.lastActive || u.updatedAt,
      isPending: false
    }));

    const pendingMembers = pendingInvites.map(inv => ({
      id: `inv-${inv._id.toString()}`,
      inviteId: inv._id.toString(),
      name: inv.email.split('@')[0],
      email: inv.email,
      role: inv.role,
      status: 'Pending Acceptance',
      avatar: generateAvatar(inv.email.split('@')[0], inv.email),
      joinedDate: inv.createdAt,
      lastActive: null,
      token: inv.token,
      inviteLink: `${req.protocol}://${req.get('host').replace(':5000', ':3000')}/register?invite=${inv.token}&email=${encodeURIComponent(inv.email)}`,
      isPending: true
    }));

    return res.json({
      organization: {
        id: org._id.toString(),
        name: org.name,
        ownerId: org.ownerId ? org.ownerId.toString() : null,
      },
      members: [...members, ...pendingMembers]
    });
  } catch (err) {
    console.error('Fetch Team Error:', err);
    return res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// POST invite new team member
router.post('/invite', async (req, res) => {
  try {
    const { email, role, organizationId, workspaceId, invitedBy } = req.body;

    if (!email || !organizationId) {
      return res.status(400).json({ error: 'Email and Organization ID are required' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user is already an active member of this organization
    const existingMember = await User.findOne({ email: cleanEmail, organizationId });
    if (existingMember) {
      return res.status(400).json({ error: 'User is already a member of this organization' });
    }

    // Check for existing pending invitation
    let invitation = await Invitation.findOne({
      email: cleanEmail,
      organizationId,
      status: 'Pending'
    });

    const token = crypto.randomBytes(24).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    let targetWorkspaceId = workspaceId;
    if (!targetWorkspaceId) {
      const org = await Organization.findById(organizationId);
      targetWorkspaceId = org?.workspaceId;
    }

    if (invitation) {
      invitation.token = token;
      invitation.role = role || 'Legal';
      invitation.expiresAt = expiresAt;
      invitation.invitedBy = invitedBy || 'Organization Admin';
      await invitation.save();
    } else {
      invitation = await Invitation.create({
        email: cleanEmail,
        organizationId,
        workspaceId: targetWorkspaceId,
        role: role || 'Legal',
        token,
        status: 'Pending',
        expiresAt,
        invitedBy: invitedBy || 'Organization Admin'
      });
    }

    const protocol = req.protocol;
    const host = req.get('host').replace(':5000', ':3000');
    const inviteLink = `${protocol}://${host}/register?invite=${token}&email=${encodeURIComponent(cleanEmail)}`;

    // Create Notification in MongoDB
    await Notification.create({
      organizationId,
      title: 'Invitation Sent',
      message: `Invitation dispatched to ${cleanEmail} for role "${role || 'Legal'}".`,
      type: 'INVITATION_SENT'
    });

    // Create Audit Log
    await AuditLog.create({
      userEmail: cleanEmail,
      action: 'TEAM_INVITATION_CREATED',
      details: `Invitation issued to ${cleanEmail} (Role: ${role}) by ${invitedBy || 'Admin'}. Token: ${token}`
    });

    return res.json({
      success: true,
      invitation: {
        id: invitation._id.toString(),
        email: cleanEmail,
        role: invitation.role,
        status: 'Pending Acceptance',
        token,
        inviteLink
      }
    });
  } catch (err) {
    console.error('Invite Member Error:', err);
    return res.status(500).json({ error: 'Failed to issue invitation' });
  }
});

// PUT update member role
router.put('/member/:userId/role', async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, organizationId } = req.body;

    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    await Membership.findOneAndUpdate(
      { userId, organizationId: organizationId || user.organizationId },
      { role },
      { upsert: true }
    );

    // Create Notification
    await Notification.create({
      organizationId: organizationId || user.organizationId,
      userId: user._id,
      title: 'Role Updated',
      message: `${user.name}'s role was updated from "${oldRole}" to "${role}".`,
      type: 'ROLE_CHANGED'
    });

    // Create Audit Log
    await AuditLog.create({
      userId: user._id.toString(),
      userEmail: user.email,
      action: 'MEMBER_ROLE_CHANGED',
      details: `Role for ${user.name} (${user.email}) changed from ${oldRole} to ${role}.`
    });

    return res.json({ success: true, user });
  } catch (err) {
    console.error('Update Role Error:', err);
    return res.status(500).json({ error: 'Failed to update member role' });
  }
});

// DELETE remove member from organization
router.delete('/member/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { organizationId } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const orgId = organizationId || user.organizationId;

    // Check if user is owner of organization
    const org = await Organization.findById(orgId);
    if (org && org.ownerId && org.ownerId.toString() === userId) {
      return res.status(400).json({ error: 'Cannot remove the Organization Owner.' });
    }

    user.organizationId = null;
    user.workspaceId = null;
    await user.save();

    await Membership.deleteOne({ userId, organizationId: orgId });

    // Create Notification
    await Notification.create({
      organizationId: orgId,
      title: 'Member Removed',
      message: `${user.name} (${user.email}) was removed from the organization.`,
      type: 'MEMBER_REMOVED'
    });

    // Create Audit Log
    await AuditLog.create({
      userId: user._id.toString(),
      userEmail: user.email,
      action: 'MEMBER_REMOVED',
      details: `Member ${user.name} (${user.email}) removed from organization.`
    });

    return res.json({ success: true, message: 'Member removed successfully' });
  } catch (err) {
    console.error('Remove Member Error:', err);
    return res.status(500).json({ error: 'Failed to remove member' });
  }
});

// DELETE revoke invitation
router.delete('/invite/:inviteId', async (req, res) => {
  try {
    const { inviteId } = req.params;
    const invitation = await Invitation.findById(inviteId);
    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' });
    }

    invitation.status = 'Revoked';
    await invitation.save();

    return res.json({ success: true, message: 'Invitation revoked successfully' });
  } catch (err) {
    console.error('Revoke Invitation Error:', err);
    return res.status(500).json({ error: 'Failed to revoke invitation' });
  }
});

module.exports = router;
