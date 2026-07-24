const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
  },
  subscription: {
    type: String,
    default: 'Enterprise SaaS Plan',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Organization', organizationSchema);
