const express = require('express');
const router = express.Router();

const Contact_Form = require('../../../models/Contact_Form');
const Contact_Submission = require('../../../models/Contact_Submission');

router
  .route('/')
  .get((req, res) => {
    Contact_Form.find()
      .then((forms) => {
        res.json(forms);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .post((req, res) => {
    let { form } = req.body;
    let newForm = new Contact_Form(form);
    newForm
      .save()
      .then((dbForm) => {
        res.json(dbForm);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  });

router
  .route('/:id')
  .get(async (req, res) => {
    let contactForm = req.params.id;
    let form = await Contact_Form.findOne({ _id: contactForm });

    if (!form) {
      return res.status(404).json({
        errors: [
          {
            message: 'No Form Found'
          }
        ]
      });
    }

    let submissions = await Contact_Submission.find({ contactForm });

    return res.json({ form, submissions });
  })
  .put((req, res) => {
    Contact_Form.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
      error,
      result
    ) {
      if (error) {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      }
      return res.sendStatus(200);
    });
  })
  .delete(async (req, res) => {
    let contactForm = req.params.id;

    // Find contact form
    let form = await Contact_Form.findOne({ _id: contactForm });
    // if no form return error
    if (!form) {
      return res.status(404).json({
        errors: [
          {
            message: 'No Form Found'
          }
        ]
      });
    }

    // Delete Form
    form.remove();

    // find and delete all submissions tied to this form
    Contact_Submission.deleteMany({ contactForm }, function (error, result) {
      if (error) {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      }
      return res.sendStatus(200);
    });
  });

module.exports = router;
