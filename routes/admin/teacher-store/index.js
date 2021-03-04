const express = require('express');
const router = express.Router();
const ImageKit = require('imagekit');

const { IMAGE_KIT_PUBLIC, IMAGE_KIT_PRIVATE, IMAGE_KIT_URL } = process.env;

const Image = require('../../../models/Image');
const Product_Teacher = require('../../../models/Product_Teacher');
const Teacher = require('../../../models/Teacher');
const Teacher_Order = require('../../../models/Teacher_Order');

const imagekit = new ImageKit({
  publicKey: IMAGE_KIT_PUBLIC,
  privateKey: IMAGE_KIT_PRIVATE,
  urlEndpoint: IMAGE_KIT_URL
});

// Teacher Store Routes

// Teacher Product Routes
router
  .route('/Products')
  // Get All Teacher Store Products
  .get((req, res) => {
    Product_Teacher.find()
      .populate('image')
      .then((products) => {
        return res.json(products);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  // Create Teacher Store Product
  .post(async (req, res) => {
    let error;
    let {
      title,
      points,
      description,
      image: { image, name }
    } = req.body;

    if (!title || !points || !description || !image) {
      return res.status(400).send({
        errors: [{ message: 'Missing Field' }]
      });
    }

    let imageOBJ = await imagekit
      .upload({
        file: image,
        fileName: name
      })
      .catch((err) => {
        error = err;
      });

    if (!imageOBJ) {
      return res.status(400).send({
        errors: [{ message: error.message }]
      });
    }

    let dbImage = new Image({
      name: imageOBJ.name,
      url: imageOBJ.url,
      imageID: imageOBJ.fileId
    });

    let dbProduct = new Product_Teacher({
      title,
      description,
      points,
      image: dbImage._id
    });

    dbImage.save();
    dbProduct.save();

    return res.json(dbProduct);
  });

router
  .route('/Products/:id')
  // Get Teacher Store Product
  .get((req, res) => {
    Product_Teacher.findById(req.params.id)
      .populate('image')
      .then((product) => {
        return res.json(product);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  // Update Teacher Store Product
  .put(async (req, res) => {
    let error;
    let {
      title,
      points,
      description,
      image: { image, name }
    } = req.body;

    if (!title || !points || !description || !name) {
      return res.status(400).send({
        errors: [{ message: 'Missing Field' }]
      });
    }

    let product = await Product_Teacher.findById(req.params.id)
      .populate('image')
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });

    if (name !== product.image.name) {
      imagekit
        .deleteFile(product.image.imageID)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      let imageOBJ = await imagekit
        .upload({
          file: image,
          fileName: name
        })
        .catch((err) => {
          error = err;
        });

      if (!imageOBJ) {
        return res.status(400).send({
          errors: [{ message: error.message }]
        });
      }

      let dbImage = new Image({
        name: imageOBJ.name,
        url: imageOBJ.url,
        imageID: imageOBJ.fileId
      });
      dbImage.save();
      product.image = dbImage._id;
      product.title = title;
      product.description = description;
      product.points = points;
      product.save();
      return res.json(product);
    } else {
      product.title = title;
      product.description = description;
      product.points = points;
      product.save();
      return res.json(product);
    }
  })
  // Delete Teacher Store Product
  .delete((req, res) => {
    Product_Teacher.findById(req.params.id)
      .then((product) => {
        Image.findByIdAndRemove(product.image);
        product.remove().then(() => {
          return res.sendStatus(200);
        });
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  });

// Teacher Order Routes
router
  .route('/Orders')
  // Get All Teacher Store Orders
  .get((req, res) => {
    Teacher_Order.find()
      .then((orders) => {
        res.json(orders);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  // Create Teacher Store Order
  .post(async (req, res) => {
    let { items, teacher } = req.body;
    console.log({ items, teacher });

    let teacherDB = await Teacher.findById(teacher);

    if (!teacherDB) {
      return res.status(404).json({
        errors: [{ message: 'No Teacher Found' }]
      });
    }

    let totalPoints = items.reduce((total, item) => {
      return item.quantity * item.points + total;
    }, 0);

    if (totalPoints > teacherDB.points) {
      return res.status(400).json({
        errors: [{ message: "Teacher Doesn't Have Enough Points" }]
      });
    }

    let order = new Teacher_Order({
      teacher,
      products: items,
      total: totalPoints
    });

    teacherDB.points = teacherDB.points - totalPoints;
    teacherDB.orders = [...teacherDB.orders, order._id];
    teacherDB.save();

    order
      .save()
      .then((response) => {
        res.send('Hello From POST Route');
      })
      .catch((err) => {
        return res.status(500).json({
          errors: [{ message: 'Server Error' }]
        });
      });
  });

router
  .route('/Orders/:id')
  // Get Teacher Store Order
  .get((req, res) => {
    Teacher_Order.findById(req.params.id)
      .populate('teacher')
      .then((order) => {
        return res.json(order);
      })
      .catch((error) => {
        let errors = getErrors(error);
        return res.status(400).send({
          errors
        });
      });
  })
  // Update Teacher Store Order
  .put((req, res) => {
    Teacher_Order.findByIdAndUpdate(
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
  // Delete Teacher Store Order
  .delete(async (req, res) => {
    let orderDB = await Teacher_Order.findById(req.params.id);
    if (!orderDB) {
      return res.status(404).json({
        errors: [{ message: 'No Order Found' }]
      });
    }

    let teacherDB = await Teacher.findById(orderDB.teacher);
    if (!teacherDB) {
      return res.status(404).json({
        errors: [{ message: 'No Teacher Found' }]
      });
    }

    let updatedOrders = teacherDB.orders.filter(
      (order) => order !== req.params.id
    );
    teacherDB.points = teacherDB.points + orderDB.total;
    teacherDB.orders = updatedOrders;
    teacherDB.save();

    orderDB.remove();

    res.send('Hello From Delete Route');
  });

module.exports = router;
