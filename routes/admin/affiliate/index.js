const express = require('express');
const router = express.Router();

const Affiliate = require('../../../models/Affiliate');
const Order_Store_Affiliate = require('../../../models/Order_Store_Affiliate');

router
  .route('/')
  .get((req, res) => {
    Affiliate.find()
      .then((affiliates) => {
        res.json(affiliates);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .post((req, res) => {
    let { affiliate } = req.body;

    let NewAffiliate = new Affiliate(affiliate);
    NewAffiliate.save()
      .then((dbAffiliate) => {
        res.json(dbAffiliate);
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
  .get(async (req, res) => {
    let dbAffiliate = await Affiliate.findById(req.params.id);

    if (!dbAffiliate) {
      return res.status(404).json({
        errors: [
          {
            message: 'No Affiliate Found'
          }
        ]
      });
    }

    let orders = await Order_Store_Affiliate.find({
      affiliateCode: dbAffiliate.code
    });
    return res.json({ dbAffiliate, orders });
  })
  .put((req, res) => {
    Affiliate.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
      error,
      result
    ) {
      if (error) {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      }
      return res.sendStatus(200);
    });
  })
  .delete((req, res) => {
    Affiliate.findById(req.params.id)
      .then((dbAffiliate) => {
        if (!dbAffiliate) {
          return res.status(404).json({
            errors: [
              {
                message: 'No Affiliate Found'
              }
            ]
          });
        }
        dbAffiliate.remove().then(() => {
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
