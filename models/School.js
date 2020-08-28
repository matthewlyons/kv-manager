const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teacher'
    }
  ],
  classList: [
    {
      className: {
        type: String,
        required: true
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher'
      },
      book: {
        type: String,
        required: true
      },
      taped: {
        type: Boolean,
        required: true
      },
      comment: {
        type: String
      }
    }
  ],
  delivery: {
    deliveryDate: {
      type: Date
    },
    fulfilled: {
      type: Boolean
    }
  },
  notes: [
    {
      note: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = School = mongoose.model('school', SchoolSchema);
