const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    default: null,
  },
  count: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
