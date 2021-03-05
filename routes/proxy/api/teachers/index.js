const express = require('express');
const router = express.Router();

const Teacher = require('../../../../models/Teacher');
const Teacher_Point_Change = require('../../../../models/Teacher_Point_Change');

const {
  verifyProxyAuth,
  generateCode,
  getShopifyCustomers,
  createShopifyCustomer
} = require('../../../../helpers');

router
  .route('/')
  .get(async (req, res) => {
    res.send('Hello from Teacher Proxy Routes!');
  })
  // Make Teacher Request
  .post(async (req, res) => {
    let { title, firstName, lastName, email } = req.body;

    email = email.toLowerCase();
    // Check if teacher email is in use
    let teacherEmail = await Teacher.findOne({ email });

    if (teacherEmail) {
      return res.status(401).json({
        errors: [{ message: 'Email Already in Use' }]
      });
    }

    let teacherCode;

    await generateCode({ firstName, lastName }).then((code) => {
      teacherCode = code;
    });

    // check if shopify customer is registered
    let shopifyCustomer;
    let customers = await getShopifyCustomers(email);
    if (customers.length === 0) {
      // if no customer create customer and send them an email invite
      console.log('Creating Customer');
      shopifyCustomer = await createShopifyCustomer({
        data: req.body,
        invite: true
      });
    } else {
      shopifyCustomer = customers[0];
    }
    console.log(shopifyCustomer);

    const RequestDB = new Teacher({
      code: teacherCode,
      title: title,
      firstName: firstName,
      lastName: lastName,
      email: email,
      shopifyID: shopifyCustomer.id
    });
    console.log(RequestDB);
    RequestDB.save().catch((err) => console.log(err));

    res.json(true);
  });

router
  .route('/:id')
  // Check if id is a teacher
  .get(async (req, res) => {
    let teacher = await Teacher.findOne({ shopifyID: req.params.id });
    if (teacher) {
      res.json(true);
    } else {
      res.json(false);
    }
  })
  .post(async (req, res) => {
    let { authToken } = req.body;
    let auth = verifyProxyAuth(req.params.id, authToken);
    console.log('Auth');
    console.log(auth);
    if (auth || process.env.NODE_ENV !== 'production') {
      console.log('Auth Success');
      let teacher = await Teacher.findOne({
        shopifyID: req.params.id
      })
        .populate('schools')
        .populate('orders');
      if (teacher) {
        return res.json(teacher);
      } else {
        return res.status(401).json({
          errors: [{ message: 'Something went wrong' }]
        });
      }
    } else {
      console.log('Error');
      return res.status(401).json({
        errors: [{ message: 'Unauthorized' }]
      });
    }
  });

module.exports = router;
