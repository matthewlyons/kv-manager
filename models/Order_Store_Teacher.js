const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Order_Store_Teacher_Schema = new Schema({
  orderNumber: {
    type: String
  },
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

module.exports = Order_Store_Teacher = mongoose.model(
  'orderStoreTeacher',
  Order_Store_Teacher_Schema
);
