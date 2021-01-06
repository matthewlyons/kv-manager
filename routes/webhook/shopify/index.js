const express = require('express');
const router = express.Router();

const Teacher = require('../../../models/Teacher');
const Teacher_Point_Change = require('../../../models/Teacher_Point_Change');
const Affiliate = require('../../../models/Affiliate');
const Order_Store_Affiliate = require('../../../models/Order_Store_Affiliate');

// Shopify Order Create Webhook
router.post('/OrderCreate', async (req, res) => {
  res.send('done');
  let {
    discount_codes,
    note_attributes,
    id,
    total_line_items_price
  } = req.body;

  const teacherCode = discount_codes[0];
  let attributes = note_attributes;
  let affiliateCode;

  attributes.forEach((attribute) => {
    if (attribute.name === 'affiliate') {
      affiliateCode = attribute.value;
    }
  });

  console.log(affiliateCode);
  console.log(teacherCode);

  // Check for Teacher account with discount code
  Teacher.findOne({ code: teacherCode })
    .then((teacher) => {
      const paymentMade = total_line_items_price;
      const newPoints = Math.round(paymentMade / 10);

      if (teacher) {
        // Create Point Change Event For Teacher
        let newPayment = new Teacher_Point_Change({
          teacher: teacher._id,
          type: 'Store Order',
          points: newPoints
        });
        newPayment.save();
        // Update Teacher Points
        teacher.points = teacher.points + newPoints;
        teacher.save();
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // Check for Refferal code using order.ref
  Affiliate.findOne({ code: affiliateCode })
    .then((affiliate) => {
      if (affiliate) {
        let { percent } = affiliate;

        let totalEarned = Math.round(paymentMade / percent);

        // Create order for affiliate
        let newOrder = new Order_Store_Affiliate({
          orderNumber: id,
          affiliateCode,
          totalEarned
        });
        console.log(newOrder);
        newOrder.save();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
