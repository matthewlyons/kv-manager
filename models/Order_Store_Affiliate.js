const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Order_Store_Affiliate_Schema = new Schema({
  orderNumber: {
    type: String
  },
  affiliateCode: {
    type: String
  },
  totalEarned: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order_Store_Affiliate = mongoose.model(
  'orderStoreAffiliate',
  Order_Store_Affiliate_Schema
);
