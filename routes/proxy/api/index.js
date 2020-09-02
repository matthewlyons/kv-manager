const express = require('express');
const router = express.Router();

router.use('/newsletter', require('./newsletter'));
router.use('/rental_products', require('./rental_products'));
router.use('/schools', require('./schools'));
router.use('/shipping', require('./shipping'));
router.use('/teachers', require('./teachers'));

module.exports = router;
