const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Rental_Payment_Schema = new Schema({
  code: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Rental_Payment = mongoose.model('rentalPayment', Rental_Payment_Schema);
