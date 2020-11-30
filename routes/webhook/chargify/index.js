const express = require('express');
const router = express.Router();

let Teacher = require('../../../models/Teacher');
let Teacher_Point_Change = require('../../../models/Teacher_Point_Change');

// Get all Rental products
router.post('/create', async (req, res) => {
  res.send('Done');
});
router.post('/update', async (req, res) => {
  res.send('Done');
});
router.post('/payment', async (req, res) => {
  res.send('Done');
  let payment = req.body['payload[transaction][amount_in_cents]'];
  let newPoints = Math.round(payment / 1000);
  let teacherCode = req.body['payload[subscription][customer][organization]'];

  console.log(teacherCode);
  console.log(newPoints);

  Teacher.findOne({ code: teacherCode })
    .then((dbTeacher) => {
      if (!dbTeacher) {
        return;
      }
      let newPayment = new Teacher_Point_Change({
        teacher: dbTeacher._id,
        type: 'Rental Payment',
        points: newPoints
      });

      newPayment.save();
      dbTeacher.points = dbTeacher.points + newPoints;
      dbTeacher.save();
      return;
    })
    .catch((err) => {
      console.log('No Teacher Found');
      return;
    });
});

module.exports = router;
