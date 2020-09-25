const express = require('express');
const router = express.Router();

const Product_Rental = require('../../../../models/Product_Rental');

// Get all Rental products
router.get('/', async (req, res) => {
  let products = await Product_Rental.find();
  res.json(products);
});

module.exports = router;
