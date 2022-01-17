import React, { useMemo } from 'react';
import Button from '../../Customizer/components/Button';

export default function CartProduct({ product }) {
  let { image, quantity, price, title, customizer } = useMemo(() => {
    let { image, quantity, price, title, customizer } = product;
    return { image, quantity, price, title, customizer };
  }, []);

  return (
    <React.Fragment>
      {customizer ? (
        <div className="CartProduct__Container">
          <img src={image} className="CartProduct__Image" />
          <div>
            <p>Customized: {title}</p>
            <p>${price / 100}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="CartProduct__Quantity">
              <p>Quantity:</p>
              <input type="number" min="1" max="10" value={quantity} />
            </div>

            <br />
            <p>
              Total: <span>${price / 100}</span>
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button text="Edit" />
              <Button text="Remove" />
            </div>
          </div>
        </div>
      ) : (
        <div className="CartProduct__Container">
          <img src={image} className="CartProduct__Image" />
          <div>
            <p>{title}</p>
            <p>${price / 100}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="CartProduct__Quantity">
              <p>Quantity:</p>
              <input type="number" min="1" max="10" value={quantity} />
            </div>

            <br />
            <p>
              Total: <span>${price / 100}</span>
            </p>
            <Button text="Remove" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
