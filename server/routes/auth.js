const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const Organization = require('../models/Organization');
const Workspace = require('../models/Workspace');
const Membership = require('../models/Membership');
const Invitation = require('../models/Invitation');
const Notification = require('../models/Notification');
const AuditLog = require('../models/AuditLog');
const { generateToken } = require('../middleware/auth');

const googleClient = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

// Helper to generate initials avatar URL
function generateAvatar(name, email) {
  const cleanName = (name || email || 'User').trim();
  const initials = cleanName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=ffffff&bold=true`;
}

// GET verify invitation token
router.get('/verify-invite', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ valid: false, error: 'Invitation token is required.' });
    }

    const invitation = await Invitation.findOne({ token, status: 'Pending' });
    if (!invitation) {
      return res.status(404).json({ valid: false, error: 'Invitation link is invalid or has already been used.' });
    }

    if (invitation.expiresAt && invitation.expiresAt < new Date()) {
      invitation.status = 'Expired';
      await invitation.save();
      return res.status(400).json({ valid: false, error: 'Invitation link has expired.' });
    }

    const org = await Organization.findById(invitation.organizationId);

    return res.json({
      valid: true,
      email: invitation.email,
      role: invitation.role,
      orgName: org ? org.name : 'Pacto Workspace',
      token: invitation.token
    });
  } catch (err) {
    console.error('Verify Invite Error:', err);
    return res.status(500).json({ valid: false, error: 'Failed to verify invitation.' });
  }
});

// Register Endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, orgName, role, inviteToken } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required for registration.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const userName = name || cleanEmail.split('@')[0];

    // CASE A: User registering via INVITATION TOKEN
    if (inviteToken) {
      const invitation = await Invitation.findOne({ token: inviteToken, status: 'Pending' });

      if (!invitation) {
        return res.status(400).json({ error: 'Invalid or expired invitation token.' });
      }

      if (invitation.expiresAt && invitation.expiresAt < new Date()) {
        invitation.status = 'Expired';
        await invitation.save();
        return res.status(400).json({ error: 'Invitation has expired.' });
      }

      const orgId = invitation.organizationId;
      const workspaceId = invitation.workspaceId;
      const assignedRole = invitation.role || 'Legal';

      let user = await User.findOne({ email: cleanEmail });
      if (!user) {
        user = await User.create({
          email: cleanEmail,
          name: userName,
          organizationId: orgId,
          workspaceId: workspaceId,
          role: assignedRole,
          status: 'Active',
          avatar: generateAvatar(userName, cleanEmail),
          lastActive: new Date()
        });
      } else {
        user.organizationId = orgId;
        user.workspaceId = workspaceId;
        user.role = assignedRole;
        user.status = 'Active';
        user.lastActive = new Date();
        await user.save();
      }

      // Upsert Membership
      await Membership.findOneAndUpdate(
        { userId: user._id, organizationId: orgId },
        { role: assignedRole, joinedAt: new Date() },
        { upsert: true }
      );

      // Update Invitation Status
      invitation.status = 'Accepted';
      await invitation.save();

      const org = await Organization.findById(orgId);
      const workspace = await Workspace.findById(workspaceId);

      // Create Notification
      await Notification.create({
        organizationId: orgId,
        title: 'Member Joined Organization',
        message: `${user.name} (${user.email}) accepted invitation and joined as ${assignedRole}.`,
        type: 'MEMBER_JOINED'
      });

      // Audit Log
      await AuditLog.create({
        userId: user._id.toString(),
        userEmail: user.email,
        action: 'INVITATION_ACCEPTED',
        details: `User ${user.name} accepted invitation to join ${org ? org.name : 'Organization'} as ${assignedRole}.`
      });

      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        organizationId: orgId.toString(),
        workspaceId: workspaceId ? workspaceId.toString() : null
      });

      return res.json({
        success: true,
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          avatar: user.avatar,
          organizationId: orgId.toString(),
          organizationName: org ? org.name : 'Enterprise Organization',
          workspaceId: workspaceId ? workspaceId.toString() : null,
          workspaceName: workspace ? workspace.name : 'Main Workspace'
        }
      });
    }

    // CASE B: Standard Registration (Creating FIRST User / Organization Owner)
    let user = await User.findOne({ email: cleanEmail });
    if (user && user.organizationId) {
      return res.status(400).json({ error: 'An account with this email already belongs to an organization.' });
    }

    const companyName = orgName || `${userName}'s Organization`;
    
    // Create new Organization
    const organization = await Organization.create({
      name: companyName,
      subscription: 'Enterprise SaaS Plan'
    });

    // Create new Workspace
    const workspace = await Workspace.create({
      organizationId: organization._id,
      name: `${companyName} Main Workspace`
    });

    if (!user) {
      user = await User.create({
        email: cleanEmail,
        name: userName,
        organizationId: organization._id,
        workspaceId: workspace._id,
        role: 'Owner', // First user automatically becomes Organization Owner (Admin)
        status: 'Active',
        avatar: generateAvatar(userName, cleanEmail),
        lastActive: new Date()
      });
    } else {
      user.organizationId = organization._id;
      user.workspaceId = workspace._id;
      user.role = 'Owner';
      user.status = 'Active';
      user.lastActive = new Date();
      await user.save();
    }

    // Link owner to organization
    organization.ownerId = user._id;
    organization.workspaceId = workspace._id;
    await organization.save();

    // Create Membership
    await Membership.create({
      userId: user._id,
      organizationId: organization._id,
      role: 'Owner',
      joinedAt: new Date()
    });

    // Welcome Notification
    await Notification.create({
      organizationId: organization._id,
      title: 'Organization Created',
      message: `Organization "${companyName}" and workspace "${workspace.name}" established. ${user.name} assigned as Organization Owner.`,
      type: 'SYSTEM'
    });

    // Audit Log
    await AuditLog.create({
      userId: user._id.toString(),
      userEmail: user.email,
      action: 'ORGANIZATION_CREATED',
      details: `New Organization "${companyName}" created by Owner ${user.name} (${user.email}).`
    });

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      organizationId: organization._id.toString(),
      workspaceId: workspace._id.toString()
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
        organizationId: organization._id.toString(),
        organizationName: organization.name,
        workspaceId: workspace._id.toString(),
        workspaceName: workspace.name
      }
    });
  } catch (err) {
    console.error('Registration Controller Error:', err);
    return res.status(500).json({ error: 'Failed to complete registration.' });
  }
});

// Standard Login Endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, inviteToken } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required to sign in.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Handle invite token if provided during login
    if (inviteToken) {
      const invitation = await Invitation.findOne({ token: inviteToken, status: 'Pending' });

      if (invitation && (!invitation.expiresAt || invitation.expiresAt > new Date())) {
        let user = await User.findOne({ email: cleanEmail });
        if (!user) {
          user = await User.create({
            email: cleanEmail,
            name: cleanEmail.split('@')[0],
            organizationId: invitation.organizationId,
            workspaceId: invitation.workspaceId,
            role: invitation.role || 'Legal',
            status: 'Active',
            avatar: generateAvatar(cleanEmail.split('@')[0], cleanEmail),
            lastActive: new Date()
          });
        } else {
          user.organizationId = invitation.organizationId;
          user.workspaceId = invitation.workspaceId;
          user.role = invitation.role || 'Legal';
          user.status = 'Active';
          user.lastActive = new Date();
          await user.save();
        }

        await Membership.findOneAndUpdate(
          { userId: user._id, organizationId: invitation.organizationId },
          { role: invitation.role || 'Legal', joinedAt: new Date() },
          { upsert: true }
        );

        invitation.status = 'Accepted';
        await invitation.save();
      }
    }

    let user = await User.findOne({ email: cleanEmail });

    // If user does not exist at all, create user + organization automatically
    if (!user) {
      const userName = cleanEmail.split('@')[0];
      const companyName = `${userName.charAt(0).toUpperCase() + userName.slice(1)} Org`;

      const org = await Organization.create({
        name: companyName,
        subscription: 'Enterprise SaaS Plan'
      });

      const workspace = await Workspace.create({
        organizationId: org._id,
        name: `${companyName} Workspace`
      });

      user = await User.create({
        email: cleanEmail,
        name: userName,
        organizationId: org._id,
        workspaceId: workspace._id,
        role: 'Owner',
        status: 'Active',
        avatar: generateAvatar(userName, cleanEmail),
        lastActive: new Date()
      });

      org.ownerId = user._id;
      org.workspaceId = workspace._id;
      await org.save();

      await Membership.create({
        userId: user._id,
        organizationId: org._id,
        role: 'Owner'
      });
    } else {
      user.lastActive = new Date();
      await user.save();
    }

    // Populate Organization and Workspace
    let organization = null;
    let workspace = null;

    if (user.organizationId) {
      organization = await Organization.findById(user.organizationId);
    }
    if (user.workspaceId) {
      workspace = await Workspace.findById(user.workspaceId);
    }

    // Fallback if organization got deleted
    if (!organization) {
      const companyName = `${user.name}'s Organization`;
      organization = await Organization.create({
        name: companyName,
        ownerId: user._id
      });
      workspace = await Workspace.create({
        organizationId: organization._id,
        name: `${companyName} Workspace`
      });
      user.organizationId = organization._id;
      user.workspaceId = workspace._id;
      user.role = user.role || 'Owner';
      await user.save();

      organization.workspaceId = workspace._id;
      await organization.save();
    }

    await AuditLog.create({
      userId: user._id.toString(),
      userEmail: user.email,
      action: 'USER_SIGN_IN',
      details: `User ${user.name} (${user.role}) signed in to ${organization.name}.`
    });

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      organizationId: organization._id.toString(),
      workspaceId: workspace ? workspace._id.toString() : null
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar || generateAvatar(user.name, user.email),
        organizationId: organization._id.toString(),
        organizationName: organization.name,
        workspaceId: workspace ? workspace._id.toString() : null,
        workspaceName: workspace ? workspace.name : 'Main Workspace'
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ error: 'Failed to process sign in.' });
  }
});

// Google Auth Endpoint
router.post('/google', async (req, res) => {
  try {
    const { idToken, credential, inviteToken } = req.body;
    const tokenToVerify = idToken || credential;

    if (!tokenToVerify) {
      return res.status(400).json({ error: 'Missing Google token.' });
    }

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: tokenToVerify,
        audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (verifyErr) {
      const fetch = (await import('node-fetch')).default || global.fetch;
      const resp = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokenToVerify}`);
      if (!resp.ok) {
        return res.status(401).json({ error: 'Failed to verify Google token with OAuth servers.' });
      }
      payload = await resp.json();
    }

    if (!payload || !payload.email) {
      return res.status(400).json({ error: 'No verified email found in Google payload.' });
    }

    const email = payload.email.toLowerCase().trim();
    const name = payload.name || email.split('@')[0];
    const avatar = payload.picture || generateAvatar(name, email);

    let user = await User.findOne({ email });

    if (inviteToken) {
      const invitation = await Invitation.findOne({ token: inviteToken, status: 'Pending' });

      if (invitation && (!invitation.expiresAt || invitation.expiresAt > new Date())) {
        if (!user) {
          user = await User.create({
            email,
            name,
            avatar,
            organizationId: invitation.organizationId,
            workspaceId: invitation.workspaceId,
            role: invitation.role || 'Legal',
            status: 'Active',
            lastActive: new Date()
          });
        } else {
          user.organizationId = invitation.organizationId;
          user.workspaceId = invitation.workspaceId;
          user.role = invitation.role || 'Legal';
          user.status = 'Active';
          user.avatar = avatar;
          user.lastActive = new Date();
          await user.save();
        }

        await Membership.findOneAndUpdate(
          { userId: user._id, organizationId: invitation.organizationId },
          { role: invitation.role || 'Legal', joinedAt: new Date() },
          { upsert: true }
        );

        invitation.status = 'Accepted';
        await invitation.save();
      }
    }

    if (!user) {
      const companyName = `${name}'s Organization`;
      const organization = await Organization.create({
        name: companyName,
        subscription: 'Enterprise SaaS Plan'
      });

      const workspace = await Workspace.create({
        organizationId: organization._id,
        name: `${companyName} Workspace`
      });

      user = await User.create({
        email,
        name,
        avatar,
        organizationId: organization._id,
        workspaceId: workspace._id,
        role: 'Owner',
        status: 'Active',
        lastActive: new Date()
      });

      organization.ownerId = user._id;
      organization.workspaceId = workspace._id;
      await organization.save();

      await Membership.create({
        userId: user._id,
        organizationId: organization._id,
        role: 'Owner'
      });
    }

    const org = await Organization.findById(user.organizationId);
    const ws = await Workspace.findById(user.workspaceId);

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      organizationId: user.organizationId.toString(),
      workspaceId: ws ? ws._id.toString() : null
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
        organizationId: user.organizationId.toString(),
        organizationName: org ? org.name : 'Organization',
        workspaceId: ws ? ws._id.toString() : null,
        workspaceName: ws ? ws.name : 'Workspace'
      }
    });
  } catch (err) {
    console.error('Google Auth Error:', err);
    return res.status(500).json({ error: 'Internal Server Error during Google Auth' });
  }
});

module.exports = router;
