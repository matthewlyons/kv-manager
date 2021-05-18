const authHelper = require('./lib/auth');
const dbHelper = require('./lib/db');
const discountHelper = require('./lib/discount');
const errorHelper = require('./lib/error');
const shippingHelper = require('./lib/shipping');
const shopifyHelper = require('./lib/shopify');
const teacherHelper = require('./lib/teacher');

module.exports = {
  ...authHelper,
  ...dbHelper,
  ...discountHelper,
  ...errorHelper,
  ...shippingHelper,
  ...shopifyHelper,
  ...teacherHelper
};
