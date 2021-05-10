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
    <section>
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
      <div className="ButtonContainer">
        {step > 0 ? (
          <button
            className="btn"
            onClick={() => {
              if (step <= 0) return;
              setStep(step - 1);
            }}
          >
            Previous
          </button>
        ) : (
          <div className="Hello World!" />
        )}

        <button className="btn" onClick={submitBasket}>
          Finish and Add To Cart
        </button>

        {step < groups - 1 ? (
          <button
            className="btn"
            onClick={() => {
              if (step >= groups - 1) return;
              setStep(step + 1);
            }}
          >
            Next
          </button>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}
