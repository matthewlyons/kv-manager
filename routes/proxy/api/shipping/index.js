const express = require('express');
const router = express.Router();

const Shipping_Estimate = require('../../../../models/Shipping_Estimate');

const { getShipping, getQuote } = require('../../../../helpers');

// Get Shipping Quote
router.post('/Quote', async (req, res) => {
  let result = await getShipping(req.body);
  let { freeShipping, packages } = result;
  let finalQuote = await getQuote(result);

  let shippingRates = finalQuote.data.rate_response.rates.map((element) => {
    let shippingDescription =
      element.carrier_friendly_name == 'Endicia' ? 'USPS' : 'UPS';
    return {
      service_name: `${element.service_type}`,
      service_code: element.service_code,
      description: shippingDescription,
      total_price: String(Math.round(element.shipping_amount.amount * 100)),
      currency: 'USD'
    };
  });

  if (freeShipping) {
    shippingRates.push({
      service_name: 'Free Shipping',
      service_code: 'FS',
      description: 'UPS',
      total_price: '0',
      currency: 'USD'
    });
  }

  let sentResponse = {
    rates: shippingRates
  };
  res.json(sentResponse);

  let { destination, items } = req.body.rate;

  let shippingEstimate = new Shipping_Estimate({
    destination,
    items,
    rates: shippingRates,
    packages
  });
  console.log(shippingEstimate);
  shippingEstimate.save();
});

module.exports = router;
