const express = require('express');
const router = express.Router();

const {
  getShopifyCustomers,
  createShopifyCustomer,
  getErrors
} = require('../../../helpers');

const Teacher = require('../../../models/Teacher');
const School = require('../../../models/School');

// Teacher Route
router
  .route('/')
  // Get All Teachers
  .get((req, res) => {
    Teacher.find()
      .populate('schools')
      .then((teachers) => {
        const teacherlist = teachers.sort(function (a, b) {
          let textA = a.lastName.toUpperCase();
          let textB = b.lastName.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        res.json(teacherlist);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  // Create new Teacher
  .post(async (req, res) => {
    let { teacher } = req.body;

    let { title, firstName, lastName, email, code } = teacher;

    // Check if teacher email is in use
    let teacherEmail = await Teacher.findOne({ email: email.toLowerCase() });

    if (teacherEmail) {
      return res.status(401).json({
        errors: [{ message: 'Email Already in Use' }]
      });
    }

    // check if teacher code is in use
    let teacherCode = await Teacher.findOne({ code });

    if (teacherCode) {
      return res.status(401).json({
        errors: [{ message: 'Code Already in Use' }]
      });
    }

    // check if shopify customer is registered
    let shopifyCustomer;
    let customers = await getShopifyCustomers(email);
    if (customers.length === 0) {
      // if no customer create customer and send them an email invite
      shopifyCustomer = await createShopifyCustomer({
        data: teacher,
        invite: true
      });
    } else {
      shopifyCustomer = customers[0];
    }

    // Save teacher to DB
    let dbTeacher = new Teacher({
      approved: true,
      code,
      title,
      firstName,
      lastName,
      email,
      shopifyID: shopifyCustomer.id
    });

    dbTeacher
      .save()
      .then((teacher) => {
        return res.json(teacher);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  });

router
  .route('/link')
  .post(async (req, res) => {
    // get school and teacher id from req.body
    let { school, teacher } = req.body;

    // make db request for teacher and school
    let dbSchool = await School.findById(school).populate('teachers');
    if (!dbSchool) {
      return res.status(404).json({
        errors: [
          {
            message: 'No School Found'
          }
        ]
      });
    }

    let dbTeacher = await Teacher.findById(teacher).populate('schools');
    if (!dbTeacher) {
      return res.status(404).json({
        errors: [
          {
            message: 'No Teacher Found'
          }
        ]
      });
    }

    // check if school already contains teacher
    let schoolsTeachers = dbSchool.teachers.map((teacher) => {
      return teacher._id;
    });

    // if true
    // return error
    if (schoolsTeachers.includes(teacher)) {
      return res.status(400).json({
        errors: [
          {
            message: 'Teacher Already in School'
          }
        ]
      });
    }

    // push teacher to school's teacher array
    // push school to teachers school array

    dbSchool.teachers.push(teacher);
    dbTeacher.schools.push(school);

    dbSchool.save();
    dbTeacher.save();

    return res.sendStatus(200);
  })
  .delete(async (req, res) => {
    // get school and teacher id from req.body
    // get school and teacher id from req.body
    let { school, teacher } = req.body;

    // make db request for teacher and school
    let dbSchool = await School.findById(school).populate('teachers');
    if (!dbSchool) {
      return res.status(404).json({
        errors: [
          {
            message: 'No School Found'
          }
        ]
      });
    }

    let dbTeacher = await Teacher.findById(teacher).populate('schools');
    if (!dbTeacher) {
      return res.status(404).json({
        errors: [
          {
            message: 'No Teacher Found'
          }
        ]
      });
    }

    // check if school already contains teacher
    let schoolsTeachers = dbSchool.teachers.map((teacher) => {
      return teacher._id;
    });
    // if false
    // return error
    if (!schoolsTeachers.includes(teacher)) {
      return res.status(400).json({
        errors: [
          {
            message: 'Teacher Not in School'
          }
        ]
      });
    }

    // check if any class object in schools class list contains teacher
    // if true
    // return error

    // remove teacher from school's teacher array
    const teacherRemoveIndex = schoolsTeachers.indexOf(teacher);
    dbSchool.teachers.splice(teacherRemoveIndex, 1);

    // remove school from teachers school array
    const schoolRemoveIndex = dbTeacher.schools
      .map((item) => {
        return item._id;
      })
      .indexOf(school);
    dbTeacher.schools.splice(schoolRemoveIndex, 1);

    dbSchool.save();
    dbTeacher.save();

    return res.sendStatus(200);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    Teacher.findById(req.params.id)
      .populate('schools')
      .then((teacher) => {
        return res.json(teacher);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  .put((req, res) => {
    Teacher.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
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
  .delete((req, res) => {
    Teacher.findById(req.params.id)
      .then((teacher) => {
        if (!teacher) {
          return res.status(404).json({
            errors: [
              {
                message: 'No Teacher Found'
              }
            ]
          });
        }
        if (teacher.schools.length > 0) {
          return res.status(400).json({
            errors: [
              {
                message: "You Can't Remove a Teacher that Still Has Schools"
              }
            ]
          });
        } else {
          teacher.remove().then(() => {
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
