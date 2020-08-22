const express = require('express');
const router = express.Router();

const School = require('../../../models/School');

const { getErrors } = require('../../../helpers');

router
  .route('/')
  .get((req, res) => {
    School.find()
      .populate('teachers')
      .then((schools) => {
        const schoolMap = schools.sort(function (a, b) {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        res.json(schoolMap);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .post((req, res) => {
    let { school } = req.body;
    const newSchool = new School(school);
    newSchool
      .save()
      .then((school) => {
        res.json(school);
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
    School.findById(req.params.id)
      .populate('teachers')
      .then((school) => {
        console.log(school);
        return res.json(school);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .put((req, res) => {
    School.findByIdAndUpdate(req.params.id, { $set: req.body }, function (error, result) {
      if (error) {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      }
      return res.sendStatus(200);
    });
  })
  .delete((req, res) => {
    School.findById(req.params.id)
      .then((school) => {
        if (!school) {
          return res.status(404).json({
            errors: [
              {
                message: 'No School Found'
              }
            ]
          });
        }
        if (school.teachers.length > 0) {
          return res.status(400).json({
            errors: [
              {
                message: "You Can't Remove a School that Still Has Teachers"
              }
            ]
          });
        } else {
          school.remove().then(() => {
            return res.sendStatus(200);
          });
        }
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  });

module.exports = router;
