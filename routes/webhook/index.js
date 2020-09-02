const express = require('express');
const router = express.Router();

router.use('/chargify', require('./chargify'));
router.use('/shopify', require('./shopify'));

module.exports = router;
