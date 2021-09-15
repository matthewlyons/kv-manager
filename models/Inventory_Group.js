const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Inventory_Group_Schema = new Schema({
  leader: {
    type: Number,
    required: true
  },
  followers: [Number]
});

module.exports = Inventory_Group = mongoose.model(
  'inventoryGroup',
  Inventory_Group_Schema
);
