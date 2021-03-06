import React, { useEffect, useState } from 'react';

import { makeRequest } from '../../util';

import Select_Class from './components/Select_Class';
import Select_Instrument from './components/Select_Instrument';
import Select_School from './components/Select_School';
import Select_Rental from './components/Select_Rental';

export default function Find_Your_School() {
  const [schools, setSchools] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    step: 0,
    school: undefined,
    class: undefined,
    instrument: undefined,
    teacher: undefined
  });

  useEffect(() => {
    makeRequest('get', '/schools').then((res) => {
      setSchools(res);
      setLoading(false);
    });
    makeRequest('get', '/rental_products').then((res) => {
      setProducts(res);
    });
  }, []);

  const goBack = () => {
    setData({ ...data, step: data.step - 1 });
  };

  const updateData = (field, value) => {
    setData({ ...data, [field]: value, step: data.step + 1 });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Select_School
            updateData={updateData}
            schools={schools}
            loading={loading}
          />
        );
      case 1:
        return (
          <Select_Class updateData={updateData} data={data} goBack={goBack} />
        );
      case 2:
        return (
          <Select_Instrument
            updateData={updateData}
            data={data}
            goBack={goBack}
          />
        );
      case 3:
        return (
          <Select_Rental data={data} products={products} goBack={goBack} />
        );
      default:
        return 'Error, Something went wrong';
    }
  };

  return <div>{getStepContent(data.step)}</div>;
}
