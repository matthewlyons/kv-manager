import React from 'react';
import { MemoryRouter, BrowserRouter, useLocation } from 'react-router-dom';

export default function Router(props) {
  return (
    <React.Fragment>
      <BrowserRouter>{props.children}</BrowserRouter>
    </React.Fragment>
  );
}
