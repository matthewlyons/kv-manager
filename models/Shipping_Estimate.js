const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Shipping_Estimate_Schema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Shipping_Estimate = mongoose.model('shippingEstimate', Shipping_Estimate_Schema);
