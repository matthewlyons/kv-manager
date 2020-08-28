import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export default function Home() {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <h1>Welcome Home</h1>
    </div>
  );
}
