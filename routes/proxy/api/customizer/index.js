const express = require('express');
const router = express.Router();

const Shopify_Product = require('../../../../models/Shopify_Product');
const Shopify_Product_Variant = require('../../../../models/Shopify_Product_Variant');
const Customizer_Group = require('../../../../models/Customizer_Group');

router
  .route('/check/:id')
  // Submit form for modal
  .get(async (req, res) => {
    let group = Customizer_Group.findOne({ instrument: req.params.id });
    if (group) {
      return res.send({ group: true });
    }
    return res.send({ group: false });
  });
router
  .route('/get/:id')
  //  Get Customizer Group for Variant
  .get(async (req, res) => {
    let shopifyProductVariant = await Shopify_Product_Variant.findOne({
      shopify_id: req.params.id
    });
    let shopifyProduct = await Shopify_Product.findOne({
      shopifyId: shopifyProductVariant.product
    });

    let productionOptionSizePosition = shopifyProduct.data.options.filter(
      (x) => {
        return x.name === 'Size' || x.name === 'size';
      }
    )[0].position;

    let variantSize =
      shopifyProductVariant['option' + productionOptionSizePosition];

    if (!shopifyProductVariant) {
      return res.status(500).send({
        errors: [{ message: 'Server Error' }]
      });
    }

    let customizerGroup = await Customizer_Group.findOne({
      instruments: shopifyProduct._id
    })
      .populate('instruments')
      .populate('tabs.sections.products');

    let results = [];
    customizerGroup.tabs.forEach((tab) => {
      let tabName = tab.name;
      let { sections } = tab;
      let sectionResults = [];
      sections.forEach((section) => {
        let { name, products } = section;
        let productResult = [];
        products.forEach((product) => {
          let { options, variants } = product.data;
          let productionOptionSizePosition = options.filter((x) => {
            return x.name === 'Size' || x.name === 'size';
          })[0]?.position;
          let variantResult = [];
          if (productionOptionSizePosition) {
            variants.forEach((variant) => {
              let innerVariantSize =
                variant['option' + productionOptionSizePosition];
              if (innerVariantSize == variantSize) {
                variantResult.push(variant);
              }
            });
          } else {
            variantResult.push(...variants);
          }
          if (variantResult.length > 0) {
            product.data.variants = variantResult;
            productResult.push(product);
          }
        });
        sectionResults.push({ name, products: productResult });
      });
      results.push({ name: tabName, sections: sectionResults });
    });

    return res.send(results);
  });

module.exports = router;
