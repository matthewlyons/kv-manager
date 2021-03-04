const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Teacher_Order_Schema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'teacher'
  },
  products: [
    {
      title: {
        type: String,
        required: true
      },
      points: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    enum: ['Processing', 'Received', 'Shipped', 'Complete'],
    default: 'Processing'
  },
  trackingNumber: {
    type: String
  },
  total: {
    type: Number,
    required: true
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
