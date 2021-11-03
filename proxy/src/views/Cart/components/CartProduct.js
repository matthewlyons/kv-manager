import React, { useMemo } from 'react';
import Button from '../../Customizer/components/Button';

export default function CartProduct({ product }) {
  let { image, quantity, price, title } = useMemo(() => {
    let { image, quantity, price, title } = product;
    return { image, quantity, price, title };
  }, []);

  return (
    <div class="CartProduct__Container">
      <img src={image} className="CartProduct__Image" />
      <div>
        <p>{title}</p>
        <p>${price / 100}</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div class="CartProduct__Quantity">
          <p>Quantity:</p>
          <input type="number" min="1" max="10" value={1} />
        </div>

        <br />
        <p>
          Total: <span>${price / 100}</span>
        </p>
        <Button text="Remove" />
      </div>
    </div>
  );
}
