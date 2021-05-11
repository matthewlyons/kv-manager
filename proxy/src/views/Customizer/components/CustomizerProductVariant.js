import React from 'react';

export default function CustomizerProductVariant({
  basket,
  group,
  product,
  variant,
  addToBasket,
  upgrade
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
        {variant.image && (
          <img src={variant.image} alt="" className="GroupItem__Image" />
        )}
      </div>
      <div className="GroupItem__Title ">
        <h3>
          {product.title} | {variant.option.key}:{variant.option.value}
        </h3>
        <h4>${product.price}</h4>
      </div>
    </div>
  );
}
