const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Product_Event_Schema = new Schema({
  active: {
    type: Boolean,
    default: false
  },
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
  current: {
    admin: {
      title: {
        type: String
      },
      body_html: {
        type: String
      }
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
    ],
    metafields: [
      {
        namespace: {
          type: String
        },
        key: {
          type: String
        },
        value: {
          type: String
        }
      }
    ]
  },
  event: {
    admin: {
      title: {
        type: String
      },
      body_html: {
        type: String
      },
      image: {
        url: {
          type: String
        },
        shopifyID: {
          type: String
        }
      }
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
    ],
    metafields: [
      {
        namespace: {
          type: String
        },
        key: {
          type: String
        },
        value: {
          type: String
        }
      }
    ]
  }
});

module.exports = Product_Event = mongoose.model(
  'productEvent',
  Product_Event_Schema
);
