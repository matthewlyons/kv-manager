const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Contact_Form_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  fields: [
    {
      name: { String },
      type: {
        type: String,
        enum: [
          'checkbox',
          'radio',
          'tel',
          'email',
          'text',
          'select',
          'textarea'
        ]
      },
      values: [String]
    }
  ]
});

module.exports = Contact_Form = mongoose.model(
  'contactForm',
  Contact_Form_Schema
);
