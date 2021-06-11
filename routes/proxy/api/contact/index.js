const express = require('express');
const ejs = require('ejs');
const path = require('path');
const router = express.Router();

const {
  generateDiscountCode,
  createShopifyDiscountCode,
  sendEmail,
  emailSignup
} = require('../../../../helpers');

const Activate_Submission = require('../../../../models/Activate_Submission');
const DiscountCode = require('../../../../models/DiscountCode');

router.route('/activate-submission').post(async (req, res) => {
  let { firstName, lastName, email, marketing, type } = req.body;

  console.log(req.body);
  console.log(marketing);

  if (marketing == 'true') {
    console.log('Marketing is True');
    emailSignup(req.body);
  } else {
    console.log('Marketing is false');
  }
  const submission = new Activate_Submission(req.body);

  if (type === 'Accessory') {
    submission
      .save()
      .then((obj) => {
        return res.json({ _id: submission._id });
      })
      .catch((err) => {
        return res.status(401).json({
          errors: [{ message: 'Something went wrong' }]
        });
      });
  }

  generateDiscountCode(firstName, lastName).then(async (code) => {
    let codeDB = new DiscountCode({ code });
    submission
      .save()
      .then((obj) => {
        createShopifyDiscountCode(code, 936086667420)
          .then((success) => {
            codeDB.save().catch((err) => {
              console.log(err);
              return res.status(401).json({
                errors: [{ message: 'Something went wrong' }]
              });
            });
            ejs.renderFile(
              path.join(__dirname, '../../../../views/email.ejs'),
              {
                firstName,
                lastName,
                code
              },
              function (err, str) {
                sendEmail(email, str, 'Thank you for Activating!')
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            );
            return res.json({ _id: submission._id, code });
          })
          .catch((err) => {
            console.log(err);
            return res.status(401).json({
              errors: [{ message: 'Something went wrong' }]
            });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).json({
          errors: [{ message: 'Something went wrong' }]
        });
      });
  });
});

router.route('/rate-submission').post(async (req, res) => {
  let { _id, rating } = req.body;
  let submission = await Activate_Submission.findById(_id);
  submission.rating = Number(rating);
  submission.save();
  return res.send('Thank You');
});

module.exports = router;
