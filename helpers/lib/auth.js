const crypto = require('crypto');

module.exports = {
  verifyProxyAuth(id, authToken) {
    const hash = crypto
      .createHmac('sha256', process.env.APP_SECRET)
      .update(id)
      .digest('hex');
    console.log(hash);
    console.log(authToken);

    if (hash === authToken) {
      return true;
    } else {
      return false;
    }
  }
};
