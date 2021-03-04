const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Image_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageID: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = Image = mongoose.model('image', Image_Schema);
