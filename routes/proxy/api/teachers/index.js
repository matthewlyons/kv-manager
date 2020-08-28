const express = require('express');
const router = express.Router();

const Teacher = require('../../../../models/Teacher');

// Get all Rental products
router.get('/:id', async (req, res) => {
  let teacher = await Teacher.findOne({ shopifyID: req.params.id });
  if (teacher) {
    res.json(true);
  } else {
    res.json(false);
  }
});

module.exports = router;
