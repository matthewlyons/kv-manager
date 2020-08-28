const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Teacher_Order_Schema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'teacher'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Teacher_Order = mongoose.model(
  'teacherOrder',
  Teacher_Order_Schema
);
