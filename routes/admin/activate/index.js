const express = require('express');
const router = express.Router();

const ActivateSubmission = require('../../../models/Activate_Submission');

router.route('/').get((req, res) => {
  ActivateSubmission.find()
    .sort({ date: -1 })
    .then((forms) => {
      res.json(forms);
    })
    .catch((error) => {
      let errors = getErrors(error);
      return res.status(400).send({
        errors
      });
    });
});

module.exports = router;
