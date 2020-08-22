const express = require('express');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.send('Hello From GET Route');
  })
  .post((req, res) => {
    res.send('Hello From POST Route');
  });

router
  .route('/:id')
  .get((req, res) => {
    res.send('Hello From GET Route');
  })
  .put((req, res) => {
    res.send('Hello From PUT Route');
  })
  .delete((req, res) => {
    res.send('Hello From DELETE Route');
  });

module.exports = router;
