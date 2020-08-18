const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StoreSchema = new Schema({
  store: {
    type: String,
    required: true
  },
  authToken: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  }
});

module.exports = Store = mongoose.model('store', StoreSchema);
