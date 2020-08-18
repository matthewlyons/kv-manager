const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Teacher_Request_Schema = new Schema({
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

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Teacher_Request = mongoose.model('teacherRequest', Teacher_Request_Schema);
