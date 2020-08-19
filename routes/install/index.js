const express = require('express');
const router = express.Router();
const axios = require('axios');

const Store = require('../../models/Store');

const { SHOPIFY_APP_KEY, SHOPIFY_APP_SECRET, SHOPIFY_APP_SCOPE, SHOPIFY_APP_NAME } = process.env;

router.get('/', (req, res) => {
  const { shop, code } = req.query;
  console.log(shop);
  console.log(req.query);
  const accessURL = `https://${shop}/admin/oauth/access_token`;
  const accessPayload = {
    client_id: SHOPIFY_APP_KEY,
    client_secret: SHOPIFY_APP_SECRET,
    code
  };

  axios
    .post(accessURL, accessPayload)
    .then(async (response) => {
      let shopifyStore = {
        store: shop,
        authToken: response.data.access_token,
        scope: SHOPIFY_APP_SCOPE
      };
      console.log(response.data.access_token);
      console.log(shopifyStore);

      await Store.findOneAndUpdate({ store: shop }, { $set: shopifyStore }, { new: true, upsert: true });

      res.redirect(`https://${shop}/admin/apps/${SHOPIFY_APP_NAME}`);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
