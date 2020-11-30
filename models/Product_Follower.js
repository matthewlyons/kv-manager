const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Product_Follower_Schema = new Schema({
  shopifyID: {
    type: String
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productStore'
  },
  title: {
    type: String,
    required: true
  },
  regular_price: {
    type: String,
    required: true
  },
  compare_at_price: {
    type: String,
    required: true
  }
});

module.exports = Product_Follower = mongoose.model(
  'productFollower',
  Product_Follower_Schema
);
