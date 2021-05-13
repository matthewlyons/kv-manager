const express = require('express');
const router = express.Router();

const {
  getShopifyCustomers,
  createShopifyCustomer,
  getErrors,
  registerShopifyDiscountCode
} = require('../../../helpers');

const Teacher = require('../../../models/Teacher');
const School = require('../../../models/School');
const Teacher_Point_Change = require('../../../models/Teacher_Point_Change');

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

    email = email.toLowerCase();

    // Check if teacher email is in use
    let teacherEmail = await Teacher.findOne({ email });

    if (teacherEmail) {
      return res.status(400).send({
        errors: [{ message: 'Email Already in Use' }]
      });
    }

    // check if teacher code is in use
    let teacherCode = await Teacher.findOne({ code });

    if (teacherCode) {
      return res.status(400).send({
        errors: [{ message: 'Code Already in Use' }]
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      shopifyCustomer = {
        id: 'a2s1df32sd1fsdf'
      };
    } else {
      // check if shopify customer is registered
      let shopifyCustomer;
      let customers = await getShopifyCustomers(email);
      console.log(customers);
      if (customers.length === 0) {
        // if no customer create customer and send them an email invite
        console.log('Creating Customer');
        shopifyCustomer = await createShopifyCustomer({
          data: teacher,
          invite: true
        });
      } else {
        shopifyCustomer = customers[0];
      }
    }
    console.log(shopifyCustomer);
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
        console.log(errors);
        return res.status(400).send({
          errors
        });
      });
  });

// Teacher Points Route
router
  .route('/points/:teacher')
  // Get points for teacher
  .get(async (req, res) => {
    let rentalPayments = await Teacher_Point_Change.find({
      teacher: req.params.teacher
    });
    res.json(rentalPayments);
  })
  // Create Point Adjust
  .post((req, res) => {
    let { points, message } = req.body;
    let dbPointAdjust = new Teacher_Point_Change({
      teacher: req.params.teacher,
      points,
      message
    });
    dbPointAdjust.save((response) => {
      res.json(response);
    });
  });

router
  .route('/points/:teacher/:id')
  // Detele point adjust
  .delete(async (req, res) => {
    let teacher = Teacher.findById(req.params.teacher);
    if (!teacher) {
      return res.status(404).json({
        errors: [{ message: 'No Teacher Found' }]
      });
    }
    // Find Teacher_Point_Change
    let adjustment = await Teacher_Point_Change.find({
      teacher: req.params.teacher,
      _id: req.params._id
    });

    if (!adjustment) {
      return res.status(404).json({
        errors: [{ message: 'No Point Adjustment Found' }]
      });
    }

    // Get value of points adjust
    // adjust teacher points equal to current minus adjust
    // delete adjustment
    // Save teacher with new object
    // Send teacher
    res.send('Hello From DELETE Route');
  });

router.route('/account/:id').post(async (req, res) => {
  let { email } = req.body;

  let teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return res.status(404).json({
      errors: [{ message: 'No Teacher Found' }]
    });
  }

  let shopifyAccount = await getShopifyCustomers(email);

  if (shopifyAccount.length === 0) {
    return res.status(404).json({
      errors: [{ message: 'No Account Found With That Email' }]
    });
  }

  if (
    teacher.email == shopifyAccount[0].email &&
    teacher.shopifyID == shopifyAccount[0].id
  ) {
    return res.status(400).json({
      errors: [
        { message: 'This Email is Already Associated with this Account' }
      ]
    });
  }

  teacher.email = shopifyAccount[0].email;
  teacher.shopifyID = shopifyAccount[0].id;

  teacher.save();

  res.send('Success');
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
      .populate('orders')
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
    Teacher.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      function (error, result) {
        if (error) {
          let errors = getErrors(error);
          return res.status(400).send({
            errors
          });
        }
        return res.sendStatus(200);
      }
    );
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

router
  .route('/request/:id')
  // Get Teacher Request by ID
  .get((req, res) => {
    Teacher.findById(req.params.id)
      .then((teacher) => {
        if (teacher.approved) {
          return res.status(400).send({
            errors: [
              {
                message: 'Teacher Already Approved'
              }
            ]
          });
        }
        return res.json(teacher);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  // Approve Teacher Request
  .post(async (req, res) => {
    console.log(req.body);
    let { firstName, lastName, email, code } = req.body;

    console.log('Testing');
    let teacher = await Teacher.findById(req.params.id);

    registerShopifyDiscountCode(code)
      .then((response) => {
        teacher.approved = true;
        teacher.firstName = firstName;
        teacher.lastName = lastName;
        teacher.email = email;
        teacher.code = code;
        teacher.save();
        res.send(teacher);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send({
          errors: [
            {
              message: 'Teacher Code Already in Use'
            }
          ]
        });
      });
  })
  // Delete Teacher Request
  .delete((req, res) => {
    Teacher.findById(req.params.id)
      .then((teacher) => {
        if (teacher.approved) {
          return res.status(400).send({
            errors: [
              {
                message: 'Teacher Already Approved'
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
