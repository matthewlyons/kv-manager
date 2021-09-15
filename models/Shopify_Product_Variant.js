const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Shopify_Product_Variant_Schema = new Schema({
  product: {
    type: Number,
    required: true
  },
  shopify_id: {
    type: Number,
    required: true
  },
  inventory_item_id: {
    type: Number,
    required: true
  },
  option1: Schema.Types.Mixed,
  option2: Schema.Types.Mixed,
  option3: Schema.Types.Mixed,
  inventoryController: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'inventoryController'
  }
});

module.exports = Shopify_Product_Variant = mongoose.model(
  'shopifyProductVariant',
  Shopify_Product_Variant_Schema
);
