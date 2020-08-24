const express = require('express');
const router = express.Router();

const Product_Rental = require('../../../models/Product_Rental');

const { getErrors } = require('../../../helpers');

router
  .route('/')
  .get((req, res) => {
    // get all rental products
    Product_Rental.find()
      // res json all rental products
      .then((products) => {
        res.json(products);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .post((req, res) => {
    // get product from req.body
    let { product } = req.body;
    // create new product
    let NewRentalProduct = new Product_Rental(product);
    // save product
    NewRentalProduct.save()
      // res.json product
      .then((dbProduct) => {
        res.json(dbProduct);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    // get product by id
    Product_Rental.findById(req.params.id)
      .then((dbProduct) => {
        if (!dbProduct) {
          return res.status(404).json({
            errors: [
              {
                message: 'No Product Found'
              }
            ]
          });
        }
        return res.json(dbProduct);
      })
      // send error if no product found
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .put((req, res) => {
    Product_Rental.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      function (error, result) {
        if (error) {
          let errors = getErrors(error);
          return res.status(400).send({
            errors
          });
        }
        return res.sendStatus(200);
      }
    );
  })
  .delete((req, res) => {
    Product_Rental.findById(req.params.id)
      .then((dbProduct) => {
        if (!dbProduct) {
          return res.status(404).json({
            errors: [
              {
                message: 'No Product Found'
              }
            ]
          });
        }
        dbProduct.remove().then(() => {
          return res.sendStatus(200);
        });
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  });

module.exports = router;
