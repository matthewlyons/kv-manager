const express = require('express');
const router = express.Router();

const Teacher = require('../../../../models/Teacher');
const Teacher_Point_Change = require('../../../../models/Teacher_Point_Change');
const Product_Teacher = require('../../../../models/Product_Teacher');
const Teacher_Order = require('../../../../models/Teacher_Order');

router.route('/').get(async (req, res) => {
  res.send('Hello from Teacher Store Proxy Routes!');
});

router.route('/Products').get(async (req, res) => {
  Product_Teacher.find()
    .populate('image')
    .then((products) => {
      return res.json(products);
    })
    .catch((error) => {
      let errors = getErrors(error);
      return res.status(400).send({
        errors
      });
    });
});

router.route('/Checkout').post(async (req, res) => {
  let { teacher, products } = req.body;
  let dbTeacher = Teacher.findById(teacher);

  if (!dbTeacher) {
    return res.status(404).send({
      errors: [{ message: 'No Teacher Found' }]
    });
  }

  res.send('Hello from Teacher Store Proxy Routes!');
});

module.exports = router;
