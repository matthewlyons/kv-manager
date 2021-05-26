const authHelper = require('./lib/auth');
const dbHelper = require('./lib/db');
const discountHelper = require('./lib/discount');
const emailHelper = require('./lib/email');
const errorHelper = require('./lib/error');
const shippingHelper = require('./lib/shipping');
const shopifyHelper = require('./lib/shopify');
const teacherHelper = require('./lib/teacher');

module.exports = {
  ...authHelper,
  ...dbHelper,
  ...discountHelper,
  ...emailHelper,
  ...errorHelper,
  ...shippingHelper,
  ...shopifyHelper,
  ...teacherHelper
};
