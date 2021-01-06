const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Page_Template_Schema = new Schema({
  shopifyID: {
    type: String,
    required: true
  },
  'gjs-html': {
    type: String,
    required: true
  },
  'gjs-components': {
    type: String,
    required: true
  },
  'gjs-assets': {
    type: String,
    required: true
  },
  'gjs-css': {
    type: String,
    required: true
  },
  'gjs-styles': {
    type: String,
    required: true
  }
});

module.exports = Page_Template = mongoose.model(
  'pageTemplate',
  Page_Template_Schema
);
