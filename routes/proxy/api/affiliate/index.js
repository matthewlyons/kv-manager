const express = require('express');
const router = express.Router();

const Affiliate = require('../../../../models/Affiliate');

router
  .route('/:code')
  // Check if code is for an affiliate
  .get(async (req, res) => {
    let affiliate = await Affiliate.findOne({ code: req.params.code }).select(
      '-percent -_id -name -__v -date'
    );
    if (affiliate) {
      res.json(affiliate);
    } else {
      res.json(false);
    }
  });

router.get('/', (req, res, next) => {
  res.send('Hello from public contact');
});

module.exports = router;
