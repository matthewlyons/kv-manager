const express = require("express");
const router = express.Router();

const { verifyApiAuth } = require("../../helpers");

// Authorize Api Route
router.use((req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    return next();
  } else {
    let authHeader = req.headers["authorization"];
    let authToken = authHeader && authHeader.split(" ")[1];
    if (authToken == null) {
      return res.status(401).json({ errors: [{ message: "Unauthorized" }] });
    }
    if (verifyApiAuth(authToken)) {
      return next();
    } else {
      return res.status(401).json({ errors: [{ message: "Unauthorized" }] });
    }
  }
});

router.use("/activate", require("./activate"));
router.use("/affiliate", require("./affiliate"));
router.use("/contact", require("./contact"));
router.use("/customizer", require("./customizer"));
router.use("/inventory", require("./inventory"));
router.use("/pages", require("./pages"));
router.use("/product", require("./product"));
router.use("/rental", require("./rental"));
router.use("/school", require("./school"));
router.use("/shipping", require("./shipping"));
router.use("/shopify", require("./shopify"));
router.use("/shopify-products", require("./shopify-products"));
// router.use('/teacher-store', require('./teacher-store'));
router.use("/teacher", require("./teacher"));

router.get("*", async function (req, res) {
  res.send("Hello from Admin Routes");
});

module.exports = router;
