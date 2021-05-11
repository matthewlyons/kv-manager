import React, { useEffect } from 'react';

export default function CustomizerSummary({
  step,
  setStep,
  groups,
  basket,
  submitBasket,
  setWindow
}) {
  return (
    <section class="Customizer__Summary">
      <ul>
        {Object.keys(basket).map((key, i) => {
          let obj = basket[key];
          return (
            <li key={i}>
              {key}: {obj.product}
              {obj.variant.option && (
                <React.Fragment> | {obj.variant.option}</React.Fragment>
              )}
              {obj.upgrade ? ` $${obj.price}` : ' Included'}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
