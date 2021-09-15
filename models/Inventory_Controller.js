const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Inventory_Controller_Schema = new Schema({
  inventoryGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'inventoryGroup'
  },
  type: {
    type: String,
    default: 'Boolean',
    enum: ['Boolean', 'Number']
  },
  inventoryLevel: {
    type: Number,
    default: () => {
      if (this.type === 'Number') {
        return 1000;
      }
    }
  },
  inStock: {
    type: Boolean,
    default: () => {
      if (this.type === 'Boolean') {
        return true;
      }
    }
  }
});

module.exports = Inventory_Controller = mongoose.model(
  'inventoryController',
  Inventory_Controller_Schema
);
