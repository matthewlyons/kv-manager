const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Product_Store_Schema = new Schema({
  shopifyID: {
    type: String
  },
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productConfig'
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
  ],
  options: [
    {
      name: {
        type: String,
        required: true
      },
      values: [String]
    }
  ],
  variants: [
    {
      shopifyID: {
        type: Number
      },
      inventory_item_id: {
        type: Number
      },
      option1: {
        type: String
      },
      option2: {
        type: String
      },
      option3: {
        type: String
      },
      regular_price: {
        type: String
      },
      sale_price: {
        type: String
      },
      compare_at_price: {
        type: String
      }
    }
  ]
});

module.exports = Product_Store = mongoose.model(
  'productStore',
  Product_Store_Schema
);
