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
  feature1: {
    type: String
  },
  feature2: {
    type: String
  },
  feature3: {
    type: String
  },
  feature4: {
    type: String
  },
  sizes: {
    type: String
  }
});

Product_Rental_Schema.pre('save', (next, done) => {
  throw { name: 'Pre', errors: ['one', 'two'] };
  next();
});

module.exports = Product_Rental = mongoose.model(
  'productRental',
  Product_Rental_Schema
);
