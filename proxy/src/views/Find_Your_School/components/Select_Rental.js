import React, { useEffect, useState } from 'react';
import Back from './Back';

import Rental_Product from '../../../components/Rental_Product';
import Rental_Container from '../../../components/Rental_Container';

export default function Select_Rental(props) {
  let { products, data, goBack } = props;
  const [rentalProducts, setRentalProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = products
      .filter((instrument) => instrument.type === data.instrument)
      .sort((a, b) => (a.price > b.price ? 1 : -1));
    setRentalProducts(filteredProducts);
  }, [products]);

  return (
    <section>
      <Back goBack={goBack} />
      <Rental_Container instrument={data.instrument}>
        {data.instrument && (
          <div>
            {rentalProducts.map((element, i) => {
              let link = {
                url: `${element.linkEducation}/?school=${data.school.name}&class=${data.class.className}&teachercode=${data.class.teacher.code}`,
                label: 'Rent'
              };
              return <Rental_Product key={i} product={element} link={link} />;
            })}
          </div>
        )}
      </Rental_Container>
    </section>
  );
}
