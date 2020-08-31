import React, { useState, useEffect, useMemo } from 'react';

import Rental_Container from '../../components/Rental_Container';
import Rental_Product from '../../components/Rental_Product';

import { makeRequest } from '../../util';
import Loading_Spinner from '../../components/Loading_Spinner';

export default function Inst_Rental(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  let { Inst, Type } = props.match.params;

  let rentalType = useMemo(() => {
    switch (Type) {
      case 'National':
      case 'national':
        return 'National';
      case 'Local':
      case 'local':
        return 'Local';
      default:
        break;
    }
  }, [props.match.params]);

  let instrument = useMemo(() => {
    switch (Inst) {
      case 'Violin':
      case 'violin':
        return 'Violin';
      case 'Viola':
      case 'viola':
        return 'Viola';
      case 'Cello':
      case 'cello':
        return 'Cello';
      case 'Bass':
      case 'bass':
        return 'Bass';
      default:
        break;
    }
  }, [props.match.params]);

  useEffect(() => {
    makeRequest('get', '/rental_products').then((res) => {
      const filteredProducts = res
        .filter((product) => product.type === instrument)
        .sort((a, b) => (a.price > b.price ? 1 : -1));
      setProducts(filteredProducts);
      setLoading(false);
    });
  }, [props.match.params]);

  return (
    <Rental_Container instrument={instrument}>
      {loading ? (
        <Loading_Spinner title="Loading Products" />
      ) : (
        <div>
          {products.map((element, i) => {
            let link = {
              url: element[`link${rentalType}`],
              label: `Rent ${rentalType}ly`
            };
            return <Rental_Product key={i} product={element} link={link} />;
          })}
        </div>
      )}
    </Rental_Container>
  );
}
