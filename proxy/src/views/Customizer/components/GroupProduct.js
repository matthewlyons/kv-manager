import React, { useMemo } from 'react';

export default function GroupProduct({ product, openModal }) {
  const [image, title, variants] = useMemo(() => {
    let { image, title, variants } = product.data;
    console.log(product);
    return [image, title, variants];
  }, [product]);

  return (
    <div className="GroupProduct__Container">
      <img src={image.src} className="GroupProduct__Image" />
      <p style={{ fontSize: '12px' }}>{title}</p>
      <p
        style={{ fontSize: '12px' }}
        onClick={() => {
          openModal(product);
        }}
      >
        QUICK LOOK
      </p>
    </div>
  );
}
