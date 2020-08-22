import React from 'react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';

export default function Router(props) {
  return (
    <React.Fragment>
      {process.env.NODE_ENV === 'development' ? (
        <BrowserRouter>{props.children}</BrowserRouter>
      ) : (
        <MemoryRouter>{props.children}</MemoryRouter>
      )}
    </React.Fragment>
  );
}
