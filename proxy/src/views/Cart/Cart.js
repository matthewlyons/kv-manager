import React, { useEffect, useState } from 'react';

import './style.css';

import axios from 'axios';

import Button from '../Customizer/components/Button';

import CartProduct from './components/CartProduct';

export default function Cart() {
  const [cart, setCart] = useState({});

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
        setCart(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Cart__Container">
      <h2>Your Cart:</h2>
      {cart.items.map((product, i) => {
        return (
          <React.Fragment key={i}>
            <div className="Cart__Divider" />
            <CartProduct product={product} />
          </React.Fragment>
        );
      })}
      <div className="Cart__Divider" />
      <div className="Cart__Summary">
        <h4>Select shipping and payment options in checkout</h4>
        <div className="Cart__Totals">
          <p>
            Total: <span>${cart.total_price / 100}</span>
          </p>
          <Button text="Remove" />
        </div>
      </div>
    </div>
  );
}
