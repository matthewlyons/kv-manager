const express = require("express");
const router = express.Router();

const Teacher = require("../../../models/Teacher");
const Product_Event = require("../../../models/Product_Event");

const {
  getPages,
  updatePage,
  getRedirects,
  createRedirect,
  deleteRedirect,
  searchProducts,
  getProduct,
  getProductMetafields,
  getPriceRules,
  getDiscountCode,
  registerShopifyDiscountCode,
  deleteShopifyDiscountCode,
} = require("../../../helpers");
const teacher = require("../../../helpers/lib/teacher");
const shopify = require("../../../helpers/lib/shopify");

router.route("/Pages").get(async (req, res) => {
  let response = await getPages();
  res.json(response.data.pages);
});

router.route("/Page/:id").post(async (req, res) => {
  console.log("REQ");

  let response = updatePage(req.params.id, req.body.html);
  console.log(response);
  res.json({ success: true });
});

router.route("/Validate").post(async (req, res) => {
  res.json("Done");
  let priceRules = await getPriceRules();
  let teacherPriceRule = priceRules.data.price_rules.filter(
    (pr) => pr.title === "Teacher Discount"
  )[0].id;

  let discountCodes = await getDiscountCode(teacherPriceRule);
  let shopifyCodes = discountCodes.data.discount_codes.map((code) => {
    return code.code;
  });

  console.log(shopifyCodes);

  console.log(`${shopifyCodes.length} Shopify Codes`);
  let teachers = await Teacher.find();

  let approvedTeachers = [];
  let misfireTeachers = [];
  let unapprovedTeachers = [];
  let requestedTeachers = [];

  teachers.forEach((teacher) => {
    let codeExists = shopifyCodes.find((x) => x === teacher.code);

    if (teacher.approved && codeExists) {
      // Teachers that are approved and have a shopify discount code.
      approvedTeachers.push(teacher);
    } else if (codeExists) {
      // Teachers that are not approved but have a shopify discount code.
      unapprovedTeachers.push(teacher);
    } else if (teacher.approved) {
      // Teachers that are approved but have don't a shopify discount code.
      misfireTeachers.push(teacher);
    } else {
      // Teachers that are not approved and don't have a shopify discount code.
      requestedTeachers.push(teacher);
    }
  });
  console.log(approvedTeachers.length, " Approved Teachers");
  console.log(misfireTeachers.length, " Misfire Teachers");
  console.log(unapprovedTeachers.length, " Unpproved Teachers");
  console.log(requestedTeachers.length, " Teacher Requests");

  unapprovedTeachers.forEach((teacher) => {
    teacher.approved = true;
    teacher.save();
  });

  // misfireTeachers.forEach((teacher) => {
  //   console.log(teacher);
  //   // registerShopifyDiscountCode(teacher.code);
  // });
});

router
  .route("/Redirects")
  .get(async (req, res) => {
    let response = await getRedirects();
    res.json(response.data.redirects);
  })
  .post(async (req, res) => {
    let response = await createRedirect(req.body);
    res.json(response.data);
  });

router.route("/Redirects/:id").delete(async (req, res) => {
  let id = req.params.id;
  let response = await deleteRedirect(id);
  if (response.status === 200) {
    res.send("Success");
  } else {
    // TODO Error handling
    res.json(false);
  }
});

// Search All Shopify Products
router.route("/Products/Search/:query").get(async (req, res) => {
  let response = await searchProducts(req.params.query);
  res.json(response.data);
});

// Get Single Shopify Product and Events for that product
router.route("/Products/:id").get(async (req, res) => {
  console.log(req.params.id);
  let product = await getProduct(req.params.id);
  let metafields = await getProductMetafields(req.params.id);

  let event = await Product_Event.findOne({
    shopifyID: req.params.id,
  });

  let response = {
    product: product.data.product,
    metafields: metafields.data,
    event,
  };

  res.json(response);
});

module.exports = router;
