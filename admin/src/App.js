import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import Home from './views/Home';

// Teacher Views
import Teacher_Home from './views/Teacher/Teacher_Home';

// Marketing Views
import Marketing_Home from './views/Marketing/Marketing_Home';

// Rental Views
import Rental_Home from './views/Rental/Rental_Home';

// Product Views
import Product_Home from './views/Product/Product_Home';

function App() {
  return (
    <MemoryRouter>
      <Route exact path="/" component={Home} />
      {/* Teacher Routes */}
      <Route exact path="/Teacher" component={Teacher_Home} />
      <Route exact path="/Teacher/Teachers" component={Teacher_Home} />
      <Route exact path="/Teacher/Teachers/Create" component={Teacher_Home} />
      <Route exact path="/Teacher/Teachers/View/:id" component={Teacher_Home} />

      {/* School Routes */}
      <Route exact path="/Teacher/Schools" component={Teacher_Home} />
      <Route exact path="/Teacher/Schools/Create" component={Teacher_Home} />
      <Route exact path="/Teacher/Schools/View/:id" component={Teacher_Home} />

      <Route exact path="/Marketing" component={Marketing_Home} />
      <Route exact path="/Marketing/Affiliate" component={Marketing_Home} />
      <Route
        exact
        path="/Marketing/Affiliate/Create"
        component={Marketing_Home}
      />
      <Route
        exact
        path="/Marketing/Affiliate/View/:id"
        component={Marketing_Home}
      />
      <Route exact path="/Marketing/Contact" component={Marketing_Home} />
      <Route
        exact
        path="/Marketing/Contact/Create"
        component={Marketing_Home}
      />
      <Route
        exact
        path="/Marketing/Contact/View/:id"
        component={Marketing_Home}
      />

      {/* Rental Product Routes */}
      <Route exact path="/Rental" component={Rental_Home} />
      <Route exact path="/Rental/Create" component={Rental_Home} />
      <Route exact path="/Rental/View/:id" component={Rental_Home} />

      {/* Store Product Routes */}
      <Route exact path="/Product" component={Product_Home} />
      <Route exact path="/Product/Create" component={Product_Home} />
      <Route exact path="/Product/View/:id" component={Product_Home} />
      <Route exact path="/Product/Config" component={Product_Home} />
      <Route exact path="/Product/Customizer" component={Product_Home} />
      <Route exact path="/Product/Customizer/Create" component={Product_Home} />
      <Route
        exact
        path="/Product/Customizer/View/:id"
        component={Product_Home}
      />
    </MemoryRouter>
  );
}

export default App;
