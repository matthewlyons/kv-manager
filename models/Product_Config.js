const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Product_Config_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  fields: {
    type: [
      {
        name: {
          type: String,
          required: true
        },
        type: {
          type: String,
          enum: ['checkbox', 'radio', 'text', 'select'],
          required: true
        },
        values: [String]
      }
    ],
    validate: (arr) => {
      return arr.length > 0;
    }
  },
  constraint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'instrumentClass'
  }
});

Product_Config_Schema.pre('save', function (next) {
  let doc = this;
  doc.fields.forEach((field) => {
    if (field.type !== 'text' && field.values.length < 1) {
      throw { name: 'Pre', errors: ['Non Text Fields Require Atleast Option'] };
    }
  });
  next();
});

module.exports = Product_Config = mongoose.model(
  'productConfig',
  Product_Config_Schema
);
