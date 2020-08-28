const errorHelper = require('./lib/error');
const shippingHelper = require('./lib/shipping');
const shopifyHelper = require('./lib/shopify');
const teacherHelper = require('./lib/teacher');

module.exports = {
  ...errorHelper,
  ...shippingHelper,
  ...shopifyHelper,
  ...teacherHelper
};
