const express = require('express');
const router = express.Router();

const School = require('../../../../models/School');

// Get all Schools
router.get('/', async (req, res) => {
  School.find()
    .select('-teachers -_id -date')
    .populate('classList.teacher', 'title firstName lastName code -_id')
    .sort({ name: 1 })
    .then((schools) => {
      res.json(schools);
    })
    .catch((error) => {
      let errors = getErrors(error);
      return res.status(400).send({
        errors
      });
    });
});

module.exports = router;
