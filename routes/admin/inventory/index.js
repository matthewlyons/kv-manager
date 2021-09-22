const express = require('express');
const router = express.Router();

const Inventory_Group = require('../../../models/Inventory_Group');
const Inventory_Controller = require('../../../models/Inventory_Controller');
const Shopify_Product = require('../../../models/Shopify_Product');
const Shopify_Product_Variant = require('../../../models/Shopify_Product_Variant');

const {
  getProductByID,
  getProductMetafieldsByID,
  createNewShopifyProduct,
  createNewShopifyVariantImage
} = require('../../../helpers');
const e = require('express');

router.route('/create/').post(async (req, res) => {
  let { title, id } = req.body;
  // Get Product by ID
  let existingShopifyProduct = await Shopify_Product.findOne({ shopifyId: id });

  function filterObject(obj, keys) {
    let result = {};
    Object.keys(obj.toJSON()).forEach((key) => {
      if (keys.indexOf(key) == -1) {
        result[key] = obj[key];
      }
    });
    return result;
  }

  function getShopifyProductObject({ data, metafields }) {
    let productData = filterObject(data, [
      'id',
      'title',
      'admin_graphql_api_id',
      'variants'
    ]);

    let images = data.images.map((image) => {
      return filterObject(image, ['id', 'variant_ids']);
    });

    productData.images = images;

    let variantData = data.variants.map((variant) => {
      return filterObject(variant, [
        'product_id',
        'id',
        'inventory_item_id',
        'image_id'
      ]);
    });

    let metafieldData = metafields.map((field) => {
      return filterObject(field, [
        'id',
        'description',
        'owner_id',
        'created_at',
        'updated_at',
        'owner_resource',
        'type',
        'admin_graphql_api_id'
      ]);
    });

    return { ...productData, variants: variantData, metafields: metafieldData };
  }

  let newProductObject = getShopifyProductObject(existingShopifyProduct);

  // Create new Product with variants / inventory levels
  let newProduct = await createNewShopifyProduct({
    ...newProductObject,
    published_scope: 'web',
    tags: 'Hidden',
    status: 'active',
    title
  });

  // Create new Product Doc
  let newProductDoc = new Shopify_Product({
    shopifyId: newProduct.id,
    data: newProduct,
    metafields: newProductObject.metafields
  });

  newProductDoc.save();

  // Check if Inventory Group Exists for product id
  let group = await Inventory_Group.find({
    $or: [{ leader: id }, { followers: id }]
  });
  let hasGroup = group.length > 0;
  console.log(hasGroup);
  // If true
  if (hasGroup) {
    let currentGroup = group[0];

    // Add New Product ID to Inventory Group
    currentGroup.followers.push(newProduct.id);
    currentGroup.save();

    // Get inventoryController id from variants and add them to new variants
    newProduct.variants.forEach(async (variant) => {
      let { option1, option2, option3, inventory_item_id, inventory_quantity } =
        variant;

      // Find Matching Variant To Get Inventory Controller Id
      let foundVariant = await Shopify_Product_Variant.findOne({
        product: id,
        option1,
        option2,
        option3
      });

      // Create Variant Doc
      let newVariant = new Shopify_Product_Variant({
        product: newProduct.id,
        shopify_id: variant.id,
        option1,
        option2,
        option3,
        inventory_item_id,
        inventoryController: foundVariant.inventoryController
      });

      newVariant.save();
    });
  }
  // If false
  else {
    // Create new Inventory group for products
    let newInventoryGroup = new Inventory_Group({
      leader: id,
      followers: [newProductDoc.shopifyId]
    });

    newInventoryGroup.save();

    newProduct.variants.forEach(async (variant) => {
      let { option1, option2, option3, inventory_item_id, inventory_quantity } =
        variant;

      let newInventoryController = new Inventory_Controller({
        inventoryGroup: newInventoryGroup._id,
        type: 'Number',
        inventoryLevel: inventory_quantity
      });

      let foundVariant = await Shopify_Product_Variant.findOne({
        product: id,
        option1,
        option2,
        option3
      });

      // Create Variant Doc
      let newVariant = new Shopify_Product_Variant({
        product: newProduct.id,
        shopify_id: variant.id,
        option1,
        option2,
        option3,
        inventory_item_id
      });

      newVariant.inventoryController = newInventoryController._id;
      foundVariant.inventoryController = newInventoryController._id;

      newInventoryController.save();
      newVariant.save();
      foundVariant.save();
    });
  }

  res.json({ success: true, data: newProduct });
});

router.route('/single/:id').get(async (req, res) => {
  const group = await InventoryGroup.findById(req.params.id);

  if (!group) {
    return res
      .status(404)
      .json({ errors: [{ message: 'No Inventory Group Found' }] });
  }

  res.json(group);
});

module.exports = router;
