const express = require('express');
const router = express.Router();

const App_Visit = require('../../../../models/App_Visit');

// Get App visits from db
router.get('/', async (req, res) => {
  let visits = await App_Visit.find();
  res.json(visits);
});

module.exports = router;
