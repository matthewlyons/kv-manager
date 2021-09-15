const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Shopify_Product_Variant = new Schema(
  {
    id: Number,
    product_id: Number,
    title: String,
    price: String,
    sku: String,
    position: Number,
    inventory_policy: String,
    compare_at_price: String,
    fulfillment_service: String,
    inventory_management: String,
    option1: String,
    option2: String,
    option3: String,
    grams: Number,
    weight: Number,
    image_id: Number,
    weight_unit: String,
    inventory_item_id: Number,
    inventory_quantity: Number,
    old_inventory_quantity: Number
  },
  { _id: false }
);

const Shopify_Product_Image = new Schema(
  {
    id: Number,
    variant_ids: [Number],
    alt: String,
    src: String
  },
  { _id: false }
);

const Shopify_Product_Metafield = new Schema(
  {
    id: Number,
    namespace: String,
    key: String,
    value_type: String,
    value: Schema.Types.Mixed
  },
  { _id: false }
);

const Shopify_Product_Option = new Schema(
  {
    name: String,
    position: Number,
    values: [String]
  },
  { _id: false }
);

// Create Schema
const Shopify_Product_Schema = new Schema({
  shopifyId: { type: Number, required: true },
  data: {
    id: Number,
    title: String,
    body_html: String,
    vendor: String,
    product_type: String,
    handle: String,
    template_suffix: String,
    status: String,
    published_scope: String,
    tags: String,
    admin_graphql_api_id: String,
    variants: [Shopify_Product_Variant],
    images: [Shopify_Product_Image],
    image: {
      id: Number,
      alt: String,
      src: String
    },
    options: [Shopify_Product_Option]
  },
  metafields: [Shopify_Product_Metafield]
});

module.exports = Shopify_Product = mongoose.model(
  'shopifyProduct',
  Shopify_Product_Schema
);
