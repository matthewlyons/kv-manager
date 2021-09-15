const express = require('express');
const router = express.Router();

router.use('/affiliate', require('./affiliate'));
router.use('/contact', require('./contact'));
router.use('/customizer', require('./customizer'));
router.use('/newsletter', require('./newsletter'));
router.use('/rental_products', require('./rental_products'));
router.use('/schools', require('./schools'));
router.use('/shipping', require('./shipping'));
router.use('/teacher_store', require('./teacher_store'));
router.use('/teachers', require('./teachers'));

module.exports = router;
