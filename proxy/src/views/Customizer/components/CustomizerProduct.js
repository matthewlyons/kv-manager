import React from 'react';

export default function CustomizerProduct({
  basket,
  group,
  product,
  addToBasket,
  upgrade,
  variant
}) {
  return (
    <div
      className={
        basket[group.section]?.variant.id === variant.id
          ? 'Customizer__Option Customizer__Option--Active'
          : 'Customizer__Option'
      }
      onClick={() => {
        addToBasket(
          group.section,
          product.title,
          {
            id: variant.id
          },
          product.price,
          upgrade
        );
      }}
    >
      <div>
        {product.image && (
          <img src={product.image} alt="" className="GroupItem__Image" />
        )}
      </div>
      <div className="GroupItem__Title">
        <h3>{product.title}</h3>
        <h4>${product.price}</h4>
      </div>
    </div>
  );
}
