const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  role: {
    type: String,
    enum: ['Owner', 'Admin', 'Legal', 'Finance', 'Procurement', 'Sales', 'Viewer'],
    default: 'Legal',
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Expired', 'Revoked'],
    default: 'Pending',
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  invitedBy: {
    type: String,
    default: 'Organization Owner',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Invitation', invitationSchema);
