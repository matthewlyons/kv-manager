const express = require('express');
const router = express.Router();

router.use('/schools', require('./schools'));
router.use('/rental_products', require('./rental_products'));
router.use('/shipping', require('./shipping'));
router.use('/teachers', require('./teachers'));

module.exports = router;
