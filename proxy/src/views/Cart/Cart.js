import React, { useEffect } from 'react';

import axios from 'axios';

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
        console.log(err);
      });
    axios({
      method: 'get',
      url: 'https://kennedyviolins.com/cart.js'
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Welcome To The Cart!</h1>
    </div>
  );
}
