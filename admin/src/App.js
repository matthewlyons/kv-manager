import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import Home from './views/Home';

// Teacher Views
import Teacher_Home from './views/Teacher/Teacher_Home';
import Teacher_Create from './views/Teacher/Teacher_Create';
import Teacher_View from './views/Teacher/Teacher_View';
import Teacher_ViewAll from './views/Teacher/Teacher_ViewAll';
import Teacher_Request from './views/Teacher/Teacher_Request';

// School Views
import School_Create from './views/School/School_Create';
import School_View from './views/School/School_View';
import School_ViewAll from './views/School/School_ViewAll';

// Marketing Views
import Marketing_Home from './views/Marketing/Marketing_Home';
import Marketing_Affiliate from './views/Marketing/Marketing_Affiliate';
import Marketing_Affiliate_Create from './views/Marketing/Marketing_Affiliate_Create';
import Marketing_Affiliate_View from './views/Marketing/Marketing_Affiliate_View';
import Marketing_Contact from './views/Marketing/Marketing_Contact';
import Marketing_Contact_Create from './views/Marketing/Marketing_Contact_Create';
import Marketing_Contact_View from './views/Marketing/Marketing_Contact_View';

// Rental Views
import Rental_Home from './views/Rental/Rental_Home';
import Rental_Form from './views/Rental/Rental_Form';

// Product Views
import Product_Home from './views/Product/Product_Home';
import Product_Form from './views/Product/Product_Form';
import Product_Config from './views/Product/Product_Config';
import Product_Config_Form from './views/Product/Product_Config_Form';
import Product_Customizer from './views/Product/Product_Customizer';
import Product_Customizer_Form from './views/Product/Product_Customizer_Form';

function App() {
  return (
    <MemoryRouter>
      <Route exact path="/" component={Home} />
      {/* Teacher Routes */}
      <Route exact path="/Teacher" component={Teacher_Home} />
      <Route exact path="/Teacher/Teachers" component={Teacher_ViewAll} />
      <Route exact path="/Teacher/Teachers/Create" component={Teacher_Create} />
      <Route exact path="/Teacher/Teachers/View/:id" component={Teacher_View} />
      <Route exact path="/Teacher/Request/:id" component={Teacher_Request} />

      {/* School Routes */}
      <Route exact path="/Teacher/Schools" component={School_ViewAll} />
      <Route exact path="/Teacher/Schools/Create" component={School_Create} />
      <Route exact path="/Teacher/Schools/View/:id" component={School_View} />

      <Route exact path="/Marketing" component={Marketing_Home} />
      <Route exact path="/Marketing/Affiliate" component={Marketing_Affiliate} />
      <Route exact path="/Marketing/Affiliate/Create" component={Marketing_Affiliate_Create} />
      <Route exact path="/Marketing/Affiliate/View/:id" component={Marketing_Affiliate_View} />
      <Route exact path="/Marketing/Contact" component={Marketing_Contact} />
      <Route exact path="/Marketing/Contact/Create" component={Marketing_Contact_Create} />
      <Route exact path="/Marketing/Contact/View/:id" component={Marketing_Contact_View} />

      {/* Rental Product Routes */}
      <Route exact path="/Rental" component={Rental_Home} />
      <Route exact path="/Rental/Create" component={Rental_Form} />
      <Route exact path="/Rental/View/:id" component={Rental_Form} />

      {/* Store Product Routes */}
      <Route exact path="/Product" component={Product_Home} />
      <Route exact path="/Product/Create" component={Product_Form} />
      <Route exact path="/Product/View/:id" component={Product_Form} />
      <Route exact path="/Product/Config" component={Product_Config} />
      <Route exact path="/Product/Config/Create" component={Product_Config_Form} />
      <Route exact path="/Product/Config/View/:id" component={Product_Config_Form} />
      <Route exact path="/Product/Customizer" component={Product_Customizer} />
      <Route exact path="/Product/Customizer/Create" component={Product_Customizer_Form} />
      <Route exact path="/Product/Customizer/View/:id" component={Product_Customizer_Form} />
    </MemoryRouter>
  );
}

export default App;
