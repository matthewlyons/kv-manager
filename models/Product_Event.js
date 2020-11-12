const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Product_Event_Schema = new Schema(
  {
    shopifyID: {
      type: String,
      required: true
    },
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    regularPrice: {
      value: {
        type: String
      },
      shopifyID: {
        type: String
      }
    },
    current: {
      title: {
        type: String
      },
      body_html: {
        type: String
      },
      old_price: {
        type: String
      },
      variants: [
        {
          shopifyID: {
            type: String,
            required: true
          },
          price: {
            type: String
          },
          compare_at_price: {
            type: String
          }
        }
      ]
    },
    event: {
      title: {
        type: String
      },
      body_html: {
        type: String
      },
      old_price: {
        type: String
      },
      variants: [
        {
          shopifyID: {
            type: String,
            required: true
          },
          price: {
            type: String
          },
          compare_at_price: {
            type: String
          }
        }
      ]
    }
  },
  { strict: false }
);

module.exports = Product_Event = mongoose.model(
  'productEvent',
  Product_Event_Schema
);
