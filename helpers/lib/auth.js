const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
  verifyProxyAuth(id, authToken) {
    const hash = crypto
      .createHmac('sha256', process.env.APP_SECRET)
      .update(id)
      .digest('hex');

    if (hash === authToken) {
      return true;
    } else {
      return false;
    }
  },
  verifyApiAuth(authToken) {
    try {
      return jwt.verify(authToken, process.env.SHOPIFY_APP_SECRET);
    } catch (err) {
      return false;
    }
  }
};
