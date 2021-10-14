const express = require('express');
const router = express.Router();

const Shopify_Product = require('../../../models/Shopify_Product');
const Customizer_Group = require('../../../models/Customizer_Group');

router
  .route('/')
  .get(async (req, res) => {
    let customizerGroups = await Customizer_Group.find()
      .populate('instruments')
      .populate('tabs.sections.products');

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
    let customizerGroup = await Customizer_Group.findById(req.params.id)
      .populate('instruments')
      .populate('tabs.sections.products');

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
  .put(async (req, res) => {
    console.log('Got Request');
    let instruments = req.body.instruments;

    if (instruments.legnth > 0) {
      let exisiting = await Customizer_Group.find({ instruments });
      if (exisiting.length > 1) {
        let customizerArray = exisiting
          .map((x) => {
            return x.name;
          })
          .join(', and ');

        return res.status(500).json({
          errors: [{ message: customizerArray + ' share an instrument.' }]
        });
      } else if (exisiting.length == 1) {
        if (exisiting[0]._id != req.params.id) {
          return res.status(500).json({
            errors: [{ message: 'Instrument Already in Another Customizer' }]
          });
        }
      }
    }

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
        res.json(result);
        console.log('Success');
      }
    );
  })
  // Delete Single Customizer Group
  .delete(async (req, res) => {
    let customizerGroup = await Customizer_Group.findOne({
      _id: req.params.id
    });

    if (customizerGroup) {
      customizerGroup.remove();
      res.json({ success: true });
    } else {
      return res
        .status(404)
        .json({ errors: [{ message: 'No Customizer Group Found' }] });
    }
  });

module.exports = router;
