const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Shipping_Estimate_Schema = new Schema({
  destination: {
    country: {
      type: String
    },
    postal_code: {
      type: String
    },
    city: {
      type: String
    },
    province: {
      type: String
    }
  },
  items: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      }
    }
  ],
  packages: [
    {
      dimensions: {
        length: {
          type: Number
        },
        width: {
          type: Number
        },
        height: {
          type: Number
        }
      },
      weight: {
        value: {
          type: Number
        }
      }
    }
  ],
  rates: [
    {
      service_name: {
        type: String
      },
      service_code: {
        type: String
      },
      total_price: {
        type: Number
      }
    }
  ],
  date: {
    type: Date,
    expires: '1w',
    default: Date.now
  }
});

module.exports = Shipping_Estimate = mongoose.model(
  'shippingEstimate',
  Shipping_Estimate_Schema
);
