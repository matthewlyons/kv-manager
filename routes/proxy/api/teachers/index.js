const express = require('express');
const router = express.Router();

const Teacher = require('../../../../models/Teacher');

const { verifyProxyAuth } = require('../../../../helpers');

router
  .route('/:id')
  // Check if id is a teacher
  .get(async (req, res) => {
    let teacher = await Teacher.findOne({ shopifyID: req.params.id });
    if (teacher) {
      res.json(true);
    } else {
      res.json(false);
    }
  })
  .post(async (req, res) => {
    let { authToken } = req.body;
    let auth = verifyProxyAuth(req.params.id, authToken);
    if (auth) {
      let teacher = await Teacher.findOne({ shopifyID: req.params.id });
      if (teacher) {
        res.json(true);
      } else {
        res.json(false);
      }
    } else {
      // TODO Error handling
      res.status(403);
    }
  });

module.exports = router;
