const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Affiliate_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  localStorageExp: {
    type: Number,
    default: 7890000
  },
  percent: {
    type: Number,
    default: 10
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Affiliate = mongoose.model('affiliate', Affiliate_Schema);
