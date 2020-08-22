const express = require('express');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    // get all rental products
    // res send all rental products
    res.send('Hello From GET Route');
  })
  .post((req, res) => {
    // get product from req.body
    // create new product
    // if errors send errors
    // save product
    // res.json product
    res.send('Hello From POST Route');
  });

router
  .route('/:id')
  .get((req, res) => {
    // get product by id
    // send error if no product found
    // send product
    res.send('Hello From GET Route');
  })
  .put((req, res) => {
    // find one and update product by id
    // send success or fail
    res.send('Hello From PUT Route');
  })
  .delete((req, res) => {
    // delete by id
    // send success or fail
    res.send('Hello From DELETE Route');
  });

module.exports = router;
