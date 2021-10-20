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
          if (err.response.data?.errors[0]?.message) {
            reject(err.response.data?.errors[0]?.message);
          } else {
            reject('Something Went Wrong');
          }
        });
    });
  }
};
