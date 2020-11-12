const express = require('express');
const router = express.Router();

const {
  getPages,
  getRedirects,
  createRedirect,
  deleteRedirect,
  searchProducts,
  getProduct,
  getProductMetafields
} = require('../../../helpers');

router.route('/Pages').get(async (req, res) => {
  let response = await getPages();
  res.json(response.data.pages);
});

router
  .route('/Redirects')
  .get(async (req, res) => {
    let response = await getRedirects();
    res.json(response.data.redirects);
  })
  .post(async (req, res) => {
    let response = await createRedirect(req.body);
    res.json(response.data);
  });

router.route('/Redirects/:id').delete(async (req, res) => {
  let id = req.params.id;
  let response = await deleteRedirect(id);
  if (response.status === 200) {
    res.send('Success');
  } else {
    // TODO Error handling
    res.json(false);
  }
});

// Search All Shopify Products
router.route('/Products/Search/:query').get(async (req, res) => {
  let response = await searchProducts(req.params.query);
  res.json(response.data);
});

// Get Single Shopify Product
router.route('/Products/:id').get(async (req, res) => {
  let product = await getProduct(req.params.id);
  let metafields = await getProductMetafields(req.params.id);
  let response = { product: product.data.product, metafields: metafields.data };
  res.json(response);
});

module.exports = router;
