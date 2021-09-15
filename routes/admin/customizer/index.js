const express = require('express');
const router = express.Router();

const Shopify_Product = require('../../../models/Shopify_Product');
const Customizer_Group = require('../../../models/Customizer_Group');

router
  .route('/')
  .get(async (req, res) => {
    let customizerGroups = await Customizer_Group.find()
      .populate('instruments')
      .populate('sections.products');

    res.send(customizerGroups);
  })
  .post((req, res) => {
    let customizerGroup = new Customizer_Group(req.body);
    customizerGroup.save();
    res.send(customizerGroup);
  });

router
  .route('/single/:id')
  // Get Single Customizer Group
  .get(async (req, res) => {
    let customizerGroup = await Customizer_Group.findById(req.params.id);

    if (!customizerGroup) {
      return res
        .status(404)
        .json({ errors: [{ message: 'No Customizer Group Found' }] });
    }

    return res.json(customizerGroup);
  })
  .post((req, res) => {
    res.send('Hello From POST Route');
  })
  // Edit Single Customizer Group
  .put((req, res) => {
    Customizer_Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err, result) => {
        if (!result) {
          return res
            .status(404)
            .json({ errors: [{ message: 'No Customizer Group Found' }] });
        }

        if (err) {
          return res.send(err);
        }
        console.log(result);
        res.json(result);
      }
    );
  })
  // Delete Single Customizer Group
  .delete((req, res) => {
    res.send('Hello From DELETE Route');
  });

module.exports = router;
