const express = require('express');
const router = express.Router();

const {
  generateDiscountCode,
  createShopifyDiscountCode
} = require('../../../../helpers');

const Activate_Submission = require('../../../../models/Activate_Submission');
const DiscountCode = require('../../../../models/DiscountCode');

router.route('/activate-submission').post((req, res) => {
  let { firstName, lastName } = req.body;
  generateDiscountCode(firstName, lastName).then(async (code) => {
    const submission = new Activate_Submission(req.body);
    let codeDB = new DiscountCode({ code });

    submission
      .save()
      .then((obj) => {
        createShopifyDiscountCode(code, 936086667420)
          .then((success) => {
            codeDB.save();
            return res.json({ code });
          })
          .catch((err) => {
            return res.status(401).json({
              errors: [{ message: 'Something went wrong' }]
            });
          });
      })
      .catch((err) => {
        return res.status(401).json({
          errors: [{ message: 'Something went wrong' }]
        });
      });
  });
});

router.get('/', (req, res, next) => {
  res.send('Hello from public contact');
});

module.exports = router;
