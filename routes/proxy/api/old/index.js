const express = require('express');
const router = express.Router();

const App_Visit = require('../../../../models/App_Visit');

// Save old app visit to db
router.post('/', async (req, res) => {
  console.log('App Visit');
  console.log(req.body);
  console.log(req.headers);
  res.send('Done');
});

module.exports = router;
