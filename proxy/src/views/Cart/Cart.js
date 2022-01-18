import React, { useEffect, useState } from 'react';

import './style.css';

import axios from 'axios';

import Button from '../Customizer/components/Button';

import CartProduct from './components/CartProduct';

export default function Cart() {
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('Running');
    axios({
      method: 'get',
      url: '/cart.js'
    })
      .then(({ data }) => {
        let itemContainer = {};
        let itemArray = [];
        console.log(data);
        setCart(data);

        data.items.forEach((item) => {
          if (item.properties.customizerCollection) {
            if (itemContainer[item.properties.customizerCollection]) {
              itemContainer[item.properties.customizerCollection] = [
                ...itemContainer[item.properties.customizerCollection],
                item
              ];
            } else {
              itemContainer[item.properties.customizerCollection] = [item];
            }
          } else {
            console.log('Adding Item', item);
            itemArray.push(item);
          }
        });
        Object.keys(itemContainer).forEach((thing) => {
          let array = itemContainer[thing];
          let item = {};

          array.forEach((x) => {
            if (x.properties.main) {
              item = x;
            }
          });
          let sum = array.reduce(
            (partial_sum, a) => partial_sum + a.final_price,
            0
          );
          item.price = sum;
          item.customizer = true;
          console.log('Adding Item', item);
          itemArray.push(item);
          itemArray.push(item);
        });
        console.log(itemArray);
        setItems(itemArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Cart__Container">
      <h2>Your Cart:</h2>
      {items.map((product, i) => {
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
        </div>
      </div>
    </div>
  );
}
