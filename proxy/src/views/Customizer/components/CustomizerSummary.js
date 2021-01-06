import React from 'react';

export default function CustomizerSummary({
  step,
  setStep,
  groups,
  basket,
  submitBasket
}) {
  return (
    <section>
      <ul>
        {Object.keys(basket).map((key) => {
          let obj = basket[key];

          return (
            <li>
              {key}: {obj.product}
              {obj.variant.option && (
                <React.Fragment> | {obj.variant.option}</React.Fragment>
              )}
            </li>
          );
        })}
      </ul>
      <div className="ButtonContainer">
        {step >= groups - 1 ? (
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
          <div />
        )}

        <button className="btn" onClick={submitBasket}>
          Finish and Add To Cart
        </button>

        {step <= 0 ? (
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
