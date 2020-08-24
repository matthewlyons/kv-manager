const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ContactSubmissionSchema = new Schema({
  contactForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contactForm'
  },
  values: [
    {
      key: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = ContactSubmission = mongoose.model(
  'contactSubmission',
  ContactSubmissionSchema
);
