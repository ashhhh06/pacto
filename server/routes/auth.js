const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

const googleClient = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

// Verify Google OAuth Token Endpoint
router.post('/google', async (req, res) => {
  try {
    const { idToken, credential } = req.body;
    const tokenToVerify = idToken || credential;

    if (!tokenToVerify) {
      return res.status(400).json({ error: 'Missing Google credential or ID token.' });
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

    const email = payload.email.toLowerCase();
    const name = payload.name || email.split('@')[0];
    const avatar = payload.picture || '';

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        avatar,
        role: 'user',
      });
    }

    await AuditLog.create({
      userId: user._id.toString(),
      userEmail: user.email,
      action: 'GOOGLE_OAUTH_SIGN_IN',
      details: `User ${name} (${email}) authenticated using Google OAuth.`,
    });

    return res.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error('Google Auth Controller Error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error during Google Auth' });
  }
});

// Standard Login / Sandbox Login Endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, name, role } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const userEmail = email.toLowerCase();
    const userName = name || (userEmail.includes('admin') ? 'David Sterling' : userEmail.split('@')[0]);
    const userRole = role || (userEmail.includes('admin') ? 'admin' : 'user');

    let user = await User.findOne({ email: userEmail });
    if (!user) {
      user = await User.create({
        email: userEmail,
        name: userName,
        role: userRole,
      });
    }

    await AuditLog.create({
      userId: user._id.toString(),
      userEmail: user.email,
      action: 'USER_SIGN_IN',
      details: `User signed in as ${user.name} (${user.role}).`,
    });

    return res.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || '',
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ error: 'Failed to process sign in.' });
  }
});

// Real Team Member Invitation Endpoint
router.post('/invite', async (req, res) => {
  try {
    const { name, email, role, access, invitedBy } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Name and Email are required for team invitation.' });
    }

    const inviteToken = `pct_invite_${Math.random().toString(36).substring(2, 10)}${Date.now()}`;
    const inviteLink = `http://localhost:3000/register?invite=${inviteToken}&email=${encodeURIComponent(email)}`;

    // Create user placeholder or update user in MongoDB
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await User.create({
        email: email.toLowerCase(),
        name,
        role: role || 'user',
      });
    }

    // Record MongoDB Audit Log for compliance
    await AuditLog.create({
      userId: user._id.toString(),
      userEmail: email.toLowerCase(),
      action: 'TEAM_MEMBER_INVITED',
      details: `Invitation dispatched to ${name} (${email}) for role "${role}" (${access}) by ${invitedBy || 'Admin'}. Token: ${inviteToken}`,
    });

    return res.json({
      success: true,
      inviteToken,
      inviteLink,
      member: {
        id: user._id.toString(),
        name,
        email: email.toLowerCase(),
        role: role || 'Legal Counsel',
        access: access || 'Legal Approver',
        status: 'Invite Active',
        inviteLink,
      },
    });
  } catch (err) {
    console.error('Invite Error:', err);
    return res.status(500).json({ error: 'Failed to process invitation.' });
  }
});

module.exports = router;
