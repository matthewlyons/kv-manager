const express = require('express');
const router = express.Router();

const Page_Template = require('../../../models/Page_Template');

router
  .route('/:id')
  .get(async (req, res) => {
    const template = await Page_Template.findOne({ shopifyID: req.params.id });
    if (template) {
      res.json(template);
    }
  })
  .post((req, res) => {
    Page_Template.findOneAndUpdate(
      { shopifyID: req.params.id },
      { shopifyID: req.params.id, ...req.body },
      { upsert: true },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        console.log('Saved template');
        return res.send('Succesfully saved.');
      }
    );
  });

module.exports = router;
