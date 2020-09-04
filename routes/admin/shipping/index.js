const express = require('express');
const router = express.Router();

const Shipping_Estimate = require('../../../models/Shipping_Estimate');

const {
  getCarrierServices,
  setCarrierService,
  deleteCarrierService
} = require('../../../helpers');

router
  // Get all Shipping Quotes
  .route('/Quotes')
  .get(async (req, res) => {
    let quotes = await Shipping_Estimate.find().limit(100).sort({ date: -1 });
    res.json(quotes);
  });

router
  // Check if carrier service is in shopify
  .route('/Services')
  .get(async (req, res) => {
    let carrierServices = await getCarrierServices();
    if (carrierServices) {
      res.json(carrierServices);
    } else {
      // TODO error handling
      res.send('Error');
    }
  })
  // Add carrier service to shopify
  .post(async (req, res) => {
    let result = await setCarrierService();
    res.send('Hello from shipping');
  })
  // remove carrier service from shopify
  .delete(async (req, res) => {
    let { service } = req.body;
    let deleted = await deleteCarrierService(service);
    if (deleted) {
      res.send('Hello from shipping');
    } else {
      // TODO error handling
      res.send('Error');
    }
  });

module.exports = router;
