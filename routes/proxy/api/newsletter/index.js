const express = require('express');
const router = express.Router();

const {
  emailSignup,
  emailAccept,
  getShopifyCustomers
} = require('../../../../helpers');

// AB Impression GET Route
router
  .route('/AB/:id')
  // Submit form for modal
  .post(async (req, res) => {
    let shopifyCustomers = await getShopifyCustomers(req.body.email);
    console.log(shopifyCustomers);
    let customer;
    if (shopifyCustomers.length == 1) {
      customer = await emailAccept(shopifyCustomers);
    } else if (shopifyCustomers.length == 0) {
      customer = await emailSignup(req.body);
    } else {
      return res.status(500).send('Something broke!');
    }

    return res.status(200).json(customer);
  });

router.get('/', (req, res, next) => {
  res.send('Hello from public contact');
});

module.exports = router;
