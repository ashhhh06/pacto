const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  role: {
    type: String,
    enum: ['Owner', 'Admin', 'Legal', 'Finance', 'Procurement', 'Sales', 'Viewer'],
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Membership', membershipSchema);
