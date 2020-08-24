const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Rental_Payment_Schema = new Schema({
  teacherCode: {
    type: String
  },
  totalEarned: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now,
    expires: '12w'
  }
});

module.exports = Rental_Payment = mongoose.model(
  'rentalPayment',
  Rental_Payment_Schema
);
