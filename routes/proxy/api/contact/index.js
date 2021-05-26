const express = require('express');
const ejs = require('ejs');
const path = require('path');
const router = express.Router();

const {
  generateDiscountCode,
  createShopifyDiscountCode,
  sendEmail
} = require('../../../../helpers');

const Activate_Submission = require('../../../../models/Activate_Submission');
const DiscountCode = require('../../../../models/DiscountCode');

router.route('/activate-submission').post((req, res) => {
  console.log(req.body);
  let { firstName, lastName, email } = req.body;
  generateDiscountCode(firstName, lastName).then(async (code) => {
    const submission = new Activate_Submission(req.body);
    let codeDB = new DiscountCode({ code });

    submission
      .save()
      .then((obj) => {
        createShopifyDiscountCode(code, 936086667420)
          .then((success) => {
            codeDB.save();
            ejs.renderFile(
              path.join(__dirname, '../../../../views/email.ejs'),
              {
                firstName,
                lastName,
                code
              },
              function (err, str) {
                sendEmail(email, str)
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            );
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
  ejs.renderFile(
    path.join(__dirname, '../../../../views/email.ejs'),
    {
      firstName: 'Matthew',
      lastName: 'Lyons',
      code: 'MLyons'
    },
    function (err, str) {
      sendEmail('lyonsmatt001@gmail.com', str)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );

  res.send('Hello from public contact');
});

module.exports = router;
