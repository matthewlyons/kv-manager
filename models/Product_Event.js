const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Product_Event_Schema = new Schema({
  shopifyID: {
    type: String,
    required: true
  }
});

module.exports = Product_Event = mongoose.model(
  'productEvent',
  Product_Event_Schema
);
