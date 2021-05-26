const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ActivateSubmissionSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  gift: {
    type: String,
    required: true
  },
  orderNumber: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  orderLocation: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ActivateSubmission = mongoose.model(
  'activateSubmission',
  ActivateSubmissionSchema
);
