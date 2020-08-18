const express = require('express');
const router = express.Router();

// Authorize Api Route
router.use((req, res, next) => {
  // TODO Add Auth
  console.log('ADMIN Route');
  next();
});

router.use('/affiliate', require('./affiliate'));
router.use('/contact', require('./contact'));
router.use('/product', require('./product'));
router.use('/rental', require('./rental'));
router.use('/school', require('./school'));
router.use('/teacher', require('./teacher'));

router.get('*', async function (req, res) {
  res.send('Hello from Admin Routes');
});

module.exports = router;
