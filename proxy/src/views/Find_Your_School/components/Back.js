import React from 'react';

export default function Back({ goBack }) {
  return (
    <section class="PaddingTopBottom">
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => {
          goBack();
        }}
      >
        &lt; Back
      </h3>
    </section>
  );
}
