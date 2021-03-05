import React, { useState, useEffect } from 'react';

import Collection_Item from '../../components/Collection_Item/Collection_Item';

import { makeRequest } from '../../util';

export default function Teacher_Store() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    makeRequest('get', '/teacher_store/products').then((res) => {
      console.log(res);
      setProducts(res);
    });
  }, []);

  return (
    <ul className="ProductList Grid GridTwoWide">
      {products.map((product, i) => {
        return <Collection_Item product={product} key={i} />;
      })}
    </ul>
  );
}
