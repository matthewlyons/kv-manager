import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Location() {
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    console.log('Hello World');
  }, []);

  return <div></div>;
}
