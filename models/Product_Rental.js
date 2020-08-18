const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Product_Rental_Schema = new Schema({
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
  image: {
    type: String,
    required: true
  },
  credit: {
    type: String
  },
  linkLocal: {
    type: String,
    required: true
  },
  linkNational: {
    type: String
  },
  linkEducation: {
    type: String
  },
  features: [String],
  sizes: {
    type: String
  }
});

module.exports = Product_Rental = mongoose.model('productRental', Product_Rental_Schema);
