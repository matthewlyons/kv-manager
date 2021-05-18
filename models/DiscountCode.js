const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ActivateDiscountCodeSchema = new Schema({
  code: {
    type: String,
    required: true
  }
});

module.exports = ActivateDiscountCode = mongoose.model(
  'activateDiscountCode',
  ActivateDiscountCodeSchema
);
