const express = require('express');
const router = express.Router();

const Product_Store = require('../../../models/Product_Store');
const Product_Config = require('../../../models/Product_Config');
const Customizer_Group = require('../../../models/Customizer_Group');

router
  .route('/')
  .get((req, res) => {
    Product_Store.find()
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
    let { product } = req.body;

    let NewProduct = new Product_Store(product);
    NewProduct.save()
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
  .route('/config')
  .get((req, res) => {
    Product_Config.find()
      .then((configs) => {
        res.json(configs);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .post((req, res) => {
    let { config } = req.body;

    let NewConfig = new Product_Config(config);
    NewConfig.save()
      .then((dbConfig) => {
        res.json(dbConfig);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  });

router
  .route('/config/:id')
  .get((req, res) => {
    Product_Config.findById(req.params.id)
      .then((config) => {
        res.json(config);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .put((req, res) => {
    Product_Config.findByIdAndUpdate(
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
    Product_Config.findById(req.params.id)
      .then((config) => {
        if (!config) {
          return res.status(404).json({
            errors: [
              {
                message: 'No Configuration Found'
              }
            ]
          });
        }
        config.remove().then(() => {
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

router
  .route('/customizer')
  .get((req, res) => {
    Customizer_Group.find()
      .then((groups) => {
        res.json(groups);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .post((req, res) => {
    let { group } = req.body;

    let NewGroup = new Customizer_Group(group);
    NewGroup.save()
      .then((dbGroup) => {
        res.json(dbGroup);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  });

router
  .route('/customizer/:id')
  .get((req, res) => {
    Customizer_Group.findById(req.params.id)
      .populate('instruments')
      .populate('products')
      .then((group) => {
        res.json(group);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .put((req, res) => {
    Customizer_Group.findByIdAndUpdate(
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
    Customizer_Group.findById(req.params.id)
      .then((group) => {
        if (!group) {
          return res.status(404).json({
            errors: [
              {
                message: 'No Group Found'
              }
            ]
          });
        }
        group.remove().then(() => {
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

router
  .route('/:id')
  .get((req, res) => {
    Product_Store.findById(req.params.id)
      .populate('config')
      .then((product) => {
        res.json(product);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .put((req, res) => {
    // TODO Update product in shopify store
    Product_Store.findByIdAndUpdate(
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
    Product_Store.findById(req.params.id)
      .then((product) => {
        if (!product) {
          return res.status(404).json({
            errors: [
              {
                message: 'No Product Found'
              }
            ]
          });
        }
        product.remove().then(() => {
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
