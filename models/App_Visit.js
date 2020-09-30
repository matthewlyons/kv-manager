const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const App_Visit_Schema = new Schema({
  route: String,
  ipAddress: String
});

module.exports = App_Visit = mongoose.model('appVisit', App_Visit_Schema);
