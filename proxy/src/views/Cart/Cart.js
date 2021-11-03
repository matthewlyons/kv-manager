import React, { useEffect } from 'react';

export default function Cart() {
  useEffect(() => {
    axios({
      method: 'get',
      url: '/cart.js'
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        reject(err);
      });
  }, []);

  return (
    <div>
      <h1>Welcome To The Cart!</h1>
    </div>
  );
}
