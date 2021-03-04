const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Teacher_Point_Change_Schema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'teacher',
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  orderNumber: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
    expires: '12w'
  }
});

module.exports = Teacher_Point_Change = mongoose.model(
  'teacherPointChange',
  Teacher_Point_Change_Schema
);
