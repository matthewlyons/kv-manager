const express = require('express');
const CryptoJS = require('crypto-js');

const router = express.Router();

const App_Visit = require('../../../../models/App_Visit');

// Save old app visit to db
router.post('/', async (req, res) => {
  res.send('Done');
  let { route } = req.body;

  let raw = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let hash = CryptoJS.SHA1(raw);
  let string = hash.toString().substring(0, 10);
  let visit = new App_Visit({ route, ipAddress: string });
  console.log(visit);
  visit.save().catch((err) => {
    console.log(err);
  });
});

module.exports = router;
