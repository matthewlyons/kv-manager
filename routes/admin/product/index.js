const express = require('express');
const router = express.Router();

const cron = require('node-cron');

const Product_Event = require('../../../models/Product_Event');
const Product_Store = require('../../../models/Product_Store');
const Product_Config = require('../../../models/Product_Config');
const Customizer_Group = require('../../../models/Customizer_Group');

const { startProducts, getErrors } = require('../../../helpers');

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
  .route('/Event/')
  .get(async (req, res) => {
    let events = await Product_Event.find();
    res.json(events);
  })
  .post(async (req, res) => {
    let { shopifyID } = req.body;

    // Check if Event exists for this product
    let existingEvents = await Product_Event.find({ shopifyID });
    if (existingEvents.length > 0) {
      return res.status(400).json({
        errors: [
          {
            message: 'One Event Per Product'
          }
        ]
      });
    }

    let event = new Product_Event(req.body);
    event.save().then((event) => {
      return res.json(event);
    });
  });

router
  .route('/Event/:id')
  .get(async (req, res) => {
    Product_Event.findById(req.params.id)
      .then((event) => {
        if (!event) {
          return res.status(404).json({
            errors: [
              {
                message: 'No Event Found'
              }
            ]
          });
        }
        return res.json(event);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .put(async (req, res) => {
    let { current, event } = req.body;
    Product_Event.findOneAndReplace({ _id: req.params.id }, req.body)
      .then((event) => {
        if (!event) {
          return res.status(404).json({
            errors: [
              {
                message: 'No Event Found'
              }
            ]
          });
        }
        console.log(event);
        console.log(req.body);
        return res.json(event);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .delete(async (req, res) => {
    Product_Event.findById(req.params.id)
      .then((event) => {
        if (!event) {
          return res.status(404).json({
            errors: [
              {
                message: 'No Event Found'
              }
            ]
          });
        }
        event.remove().then(() => {
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

cron.schedule('00 00 */1 * * * *', async () => {
  // cron.schedule(' * * * * *', async () => {
  let newEvents = [];
  let oldEvents = [];
  // Find all inactive Events that need to go live
  Product_Event.find({
    active: false,
    start: {
      $lte: Date.now()
    }
  }).then((events) => {
    newEvents = events;
    // find all active events that need to be removed
    Product_Event.find({
      active: true,
      end: {
        $lte: Date.now()
      }
    }).then((events) => {
      oldEvents = events;
      console.log(newEvents, oldEvents);
      if (oldEvents.length > 0 || newEvents.length > 0) {
        startProducts(newEvents, oldEvents);
      } else {
        console.log('Nothing to report');
      }
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
