const axios = require('axios');

module.exports = {
  makeRequest(method, route, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: `/admin${route}`,
        headers: { Authorization: 'Bearer ' + window.authToken },
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
