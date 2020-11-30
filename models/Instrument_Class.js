const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Instrument_Class_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  options: {
    type: [
      {
        field: {
          type: String,
          required: true
        },
        values: {
          type: [String],
          validate: (arr) => {
            return arr.length > 0;
          }
        }
      }
    ],
    validate: (arr) => {
      return arr.length > 0;
    }
  }
});

module.exports = Instrument_Class = mongoose.model(
  'instrumentClass',
  Instrument_Class_Schema
);
