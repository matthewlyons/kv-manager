const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Product_Config_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  fields: [
    {
      name: { String },
      type: {
        type: String,
        enum: ['checkbox', 'radio', 'text', 'select', 'textarea']
      },
      values: [String],
      defaultValue: { String }
    }
  ]
});

module.exports = Product_Config = mongoose.model(
  'productConfig',
  Product_Config_Schema
);
