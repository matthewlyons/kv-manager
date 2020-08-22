const errorHelper = require('./lib/error');
const shopifyHelper = require('./lib/shopify');
const teacherHelper = require('./lib/teacher');

module.exports = {
  ...errorHelper,
  ...shopifyHelper,
  ...teacherHelper
};
