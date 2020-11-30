const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Product_Store_Schema = new Schema({
  shopifyID: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  regular_price: {
    type: String,
    required: () => {
      return !Array.isArray(this.variants) || this.variants.length === 0;
    }
  },
  sale_price: {
    type: String
  },
  compare_at_price: {
    type: String,
    required: () => {
      return !Array.isArray(this.variants) || this.variants.length === 0;
    }
  },
  in_stock: {
    type: Boolean,
    default: () => {
      if (!Array.isArray(this.variants) || this.variants.length === 0) {
        return true;
      }
    }
  },
  images: [
    {
      shopifyID: {
        type: String,
        required: true
      },
      position: {
        type: Number,
        required: true
      },
      src: {
        type: String
      }
    }
  ],
  config: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productConfig'
  },
  options: {
    type: [
      {
        name: {
          type: String,
          required: true
        },
        values: [String]
      }
    ],
    validate: (arr) => {
      return arr.length <= 3;
    }
  },
  variants: [
    {
      in_stock: {
        type: Boolean,
        default: true
      },
      shopifyID: {
        type: Number
      },
      inventory_item_id: {
        type: Number
      },
      option1: {
        type: String,
        required: () => {
          return !Array.isArray(this.options) || this.options.length >= 1;
        }
      },
      option2: {
        type: String,
        required: () => {
          return !Array.isArray(this.options) || this.options.length >= 2;
        }
      },
      option3: {
        type: String,
        required: () => {
          return !Array.isArray(this.options) || this.options.length >= 3;
        }
      },
      regular_price: {
        type: String,
        required: true
      },
      compare_at_price: {
        type: String,
        required: true
      }
    }
  ],
  data: [
    {
      field: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'productFollower'
    }
  ]
});

module.exports = Product_Store = mongoose.model(
  'productStore',
  Product_Store_Schema
);
