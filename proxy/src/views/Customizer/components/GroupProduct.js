import React, { useMemo } from 'react';

export default function GroupProduct({ product }) {
  const [image, title, variants] = useMemo(() => {
    let { image, title, variants } = product.data;
    return [image, title, variants];
  }, [product]);

  return (
    <div>
      <p>{title}!</p>
    </div>
  );
}
