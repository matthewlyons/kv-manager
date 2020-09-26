const express = require('express');
const router = express.Router();

const App_Visit = require('../../../../models/App_Visit');

// Save old app visit to db
router.post('/', async (req, res) => {
  res.send('Done');
  let { route } = req.body;
  let ipAddress =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log(route);
  console.log(typeof route);
  console.log(ipAddress);
  console.log(typeof ipAddress);
  let visit = new App_Visit({ route, ipAddress });
  visit.save().catch((err) => {
    console.log(err);
  });
});

module.exports = router;
