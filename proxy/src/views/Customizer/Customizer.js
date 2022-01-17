import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeRequest } from '../../util';

import SelectedProductDisplay from './components/SelectedProductDisplay';
import CustomizerGroup from './components/CustomizerGroup';
import './style.css';
import Button from './components/Button';

import axios from 'axios';

import test from './object.js';

export default function Customizer() {
  let { id } = useParams();

  const [instrument, setInstrument] = useState({});
  const [instrumentCost, setInstrumentCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState({});
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState(0);

  const [basket, setBasket] = useState({ variant: id, products: [] });

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      setInstrument(test.instrument);
      let foundVariant = test.instrument.data.variants.filter(
        (x) => x.id == id
      );
      setInstrumentCost(Number(foundVariant[0].price));
      setVariant(foundVariant[0]);
      setTabs(test.tabs);
    } else {
      makeRequest('get', '/customizer/get/' + id).then((res) => {
        console.log(res);
        setInstrument(res.instrument);
        let foundVariant = res.instrument.data.variants.filter(
          (x) => x.id == id
        );
        setInstrumentCost(Number(foundVariant[0].price));
        setVariant(foundVariant[0]);
        setTabs(res.tabs);
      });
    }
  }, []);

  useEffect(() => {
    let updatedTotal = 0;
    updatedTotal = updatedTotal + instrumentCost;
    if (basket.products.length > 0) {
      let productCost = basket.products.map((a) => {
        return Number(a.variant.price);
      });

      let totalProductCost = productCost.reduce((a, b) => a + b, 0);
      totalProductCost = roundNumber(totalProductCost);
      setTotalCost(updatedTotal + totalProductCost);
    } else {
      setTotalCost(updatedTotal);
    }
  }, [basket, instrumentCost]);

  const roundNumber = (num) => {
    return Math.round(num * 100) / 100;
  };

  const addToCart = () => {
    console.log('Adding');
    console.log(basket);

    let start = Date.now();

    let productVariants = basket.products.map((x) => {
      return {
        id: x.variant.id,
        quantity: quantity,
        properties: {
          customizerCollection: start
        }
      };
    });
    let items = [
      {
        id: basket.variant,
        quantity: quantity,
        properties: {
          customizerCollection: start,
          main: true
        }
      },
      ...productVariants
    ];
    console.log({ items });

    axios({
      method: 'post',
      url: '/cart/add.js',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { items }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log('Error');
        console.log(err);
      });
  };

  return (
    <div className="Customizer__Container">
      <div>
        <h3>Your Selections:</h3>
      </div>
      <div className="Selections__Container">
        <div className="SelectedProducts">
          <SelectedProductDisplay
            image={instrument.data?.image.src}
            title={instrument.data?.title}
            subheading={variant?.price ? '$' + variant.price : ''}
          />
          <SelectedProductDisplay
            image="https://cdn.shopify.com/s/files/1/2994/5334/products/Oblong_DkBlue_Angle_1200x1200.jpg?v=1604718959"
            title="Hello World"
            subheading="Choose Color"
          />
        </div>
        <div>
          {basket.products.length > 0 && (
            <div>
              <h4 style={{ fontWeight: 'bold' }}>Outfit Summary:</h4>
              {basket.products.map((x, i) => {
                return (
                  <p key={i} className="OutfitSummary_Product">
                    {x.product.data.title}
                  </p>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div style={{ textAlign: 'center' }}>
            <p>Quantity:</p>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
            <p>at ${roundNumber(totalCost)} ea</p>
            <br />
            <h3>
              Total: <span>${roundNumber(totalCost * quantity)}</span>
            </h3>
            <p>It's Perfect</p>
            <Button
              text="Add To Cart"
              onClick={() => {
                addToCart();
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <h3>Customize Your Order...</h3>
        <p>
          Upgrade options will replace the standard items in your outfit. Make
          your selections below.
        </p>
        <CustomizerGroup
          tabs={tabs}
          active={active}
          setBasket={setBasket}
          basket={basket}
          onChange={(e) => {
            setActive(e);
          }}
        />
      </div>
    </div>
  );
}
