const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TeacherSchema = new Schema({
  approved: {
    type: Boolean,
    default: false
  },
  pinned: {
    type: Boolean,
    default: false
  },
  code: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  shopifyID: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 500
  },
  schools: [
    {
      type: Schema.Types.ObjectId,
      ref: 'school'
    }
  ],
  purchaseHistory: [
    {
      id: {
        type: String,
        required: true
      },
      points: {
        type: Number,
        required: true
      },
      item: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Teacher = mongoose.model('teacher', TeacherSchema);
