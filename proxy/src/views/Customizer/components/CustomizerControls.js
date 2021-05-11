import React from 'react';

export default function CustomizerControls({
  step,
  setStep,
  groups,
  basket,
  submitBasket,
  setWindow
}) {
  return (
    <div className="Customizer__Controls">
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
  );
}
