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
    res.send('Hello from Teacher Proxy Routes');
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
        data: teacher,
        invite: true
      });
    } else {
      shopifyCustomer = customers[0];
    }

    const RequestDB = new Teacher({
      code: teacherCode,
      title: title,
      firstName: firstName,
      lastName: lastName,
      email: email,
      shopifyID: shopifyCustomer.id
    });

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

    let teacher = await Teacher.findOne({ shopifyID: req.params.id }).populate(
      'schools'
    );
    // .populate('orders');
    if (teacher) {
      let pointEvents = await Teacher_Point_Change.find({
        teacher: teacher._id
      });

      res.json({ teacher, pointEvents });
    } else {
      res.json(false);
    }
    // if (auth) {
    //   let teacher = await Teacher.findOne({ shopifyID: req.params.id });
    //   if (teacher) {
    //     res.json(teacher);
    //   } else {
    //     res.json(false);
    //   }
    // } else {
    //   // TODO Error handling
    //   res.status(403);
    // }
  });

module.exports = router;
