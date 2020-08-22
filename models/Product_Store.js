const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Product_Store_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: [String],
  features: [String],
  config: {
    type: String
  },
  fields: [
    {
      metafield: {
        type: Number
      },
      key: {
        type: String
      },
      value: {
        type: String
      }
    }
  ]
});

module.exports = Product_Store = mongoose.model('productStore', Product_Store_Schema);
