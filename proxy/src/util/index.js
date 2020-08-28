const axios = require('axios');

module.exports = {
  makeRequest(method, route, data) {
    if (process.env.NODE_ENV === 'development') {
      url = `/proxy/api${route}`;
    } else {
      url = `/community/tools/api${route}`;
    }
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url,
        data
      })
        .then((result) => {
          resolve(result.data);
        })
        .catch((err) => {
          reject(err.response.data.message);
        });
    });
  }
};
