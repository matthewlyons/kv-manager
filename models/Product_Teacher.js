const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Product_Teacher_Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  points: {
    type: Number,
    required: true
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'image'
  }
});

module.exports = Product_Teacher = mongoose.model(
  'productTeacher',
  Product_Teacher_Schema
);
