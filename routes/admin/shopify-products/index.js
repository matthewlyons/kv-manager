const express = require('express');
const router = express.Router();

const {
  getProductMetafields,
  getAllShopifyProducts
} = require('../../../helpers');

const Shopify_Product = require('../../../models/Shopify_Product');
const Shopify_Product_Variant = require('../../../models/Shopify_Product_Variant');

router.route('/').get(async (req, res) => {
  let shopifyProducts = [];
  await getAllShopifyProducts()
    .then((products) => {
      console.log('END');
      console.log(products.length);
      shopifyProducts = products;
    })
    .catch((err) => {
      console.log(err);
    });

  await verifyProduct();

  async function verifyProduct(i = 0) {
    if (i >= shopifyProducts.length) {
      return;
    }
    console.log('\n');
    console.log(`Checking Product ${i + 1} of ${shopifyProducts.length}...`);

    let product = shopifyProducts[i];
    let { variants, images } = product;
    let existingProduct = await Shopify_Product.findOne({
      shopifyId: product.id
    });
    if (existingProduct) {
      console.log('Found');
      return verifyProduct(i + 1);
    }

    console.log('Not Found');

    variants.forEach((variant) => {
      let { product_id, id, inventory_item_id, option1, option2, option3 } =
        variant;
      let newVariant = new Shopify_Product_Variant({
        product: product_id,
        shopify_id: id,
        option1,
        option2,
        option3,
        inventory_item_id
      });
      newVariant.save();
    });

    let updatedVariants = variants.map((variant) => {
      let imageArray = images.filter((x) => x.id === variant.image_id);
      if (imageArray.length > 0) {
        return { ...variant, image: imageArray[0] };
      } else {
        return { ...variant };
      }
    });

    let response = await getProductMetafields(product.id);
    let productDoc = new Shopify_Product({
      shopifyId: product.id,
      data: { ...product, variants: updatedVariants },
      metafields: response.data.metafields
    });
    productDoc.save();
    setTimeout(() => {
      return verifyProduct(i + 1);
    }, 1000);
  }

  res.json({ success: true });
});

router.route('/product').get(async (req, res) => {
  let products = await Shopify_Product.find();

  res.json(products);
});

router.route('/product/search').post(async (req, res) => {
  let { query } = req.body;
  let products = await Shopify_Product.find({
    'data.title': { $regex: new RegExp(query, 'i') }
  }).limit(100);

  res.json(products);
});

router.route('/product/:shopify').get(async (req, res) => {
  let product = await Shopify_Product.findOne({
    shopifyId: req.params.shopify
  });

  res.json(product);
});

module.exports = router;
