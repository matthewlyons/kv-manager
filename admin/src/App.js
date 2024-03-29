import React from "react";
import Router from "./components/Router";
import { Route } from "react-router-dom";

import Home from "./views/Home";

// Teacher Views
import Teacher_Index from "./views/Teacher/Teacher_Index";
import Teacher_Home from "./views/Teacher/Teacher_Home";
import Teacher_Create from "./views/Teacher/Teacher_Create";
import Teacher_View from "./views/Teacher/Teacher_View";
import Teacher_ViewAll from "./views/Teacher/Teacher_ViewAll";
import Teacher_Request from "./views/Teacher/Teacher_Request";

// Teacher Loyalty Shop
import Teacher_Order from "./views/Teacher/Teacher_Order";
import Teacher_Order_View from "./views/Teacher/Teacher_Order_View";
import Teacher_Products from "./views/Teacher/Teacher_Products";
import Teacher_Product_Create from "./views/Teacher/Teacher_Product_Create";
import Teacher_Order_Create from "./views/Teacher/Teacher_Order_Create";

// School Views
import School_Create from "./views/School/School_Create";
import School_View from "./views/School/School_View";
import School_ViewAll from "./views/School/School_ViewAll";

// Marketing Views
import Marketing_Home from "./views/Marketing/Marketing_Home";
import Marketing_Affiliate from "./views/Marketing/Marketing_Affiliate";
import Marketing_Affiliate_Create from "./views/Marketing/Marketing_Affiliate_Create";
// import Marketing_Affiliate_View from './views/Marketing/Marketing_Affiliate_View';
import Marketing_Contact from "./views/Marketing/Marketing_Contact";
import Marketing_Contact_Create from "./views/Marketing/Marketing_Contact_Create";
import Marketing_Contact_View from "./views/Marketing/Marketing_Contact_View";
import Marketing_URL from "./views/Marketing/Marketing_URL";

// Rental Views
import Rental_Home from "./views/Rental/Rental_Home";
import Rental_Form from "./views/Rental/Rental_Form";

// Product Views
import Product_Home from "./views/Product/Product_Home";
import Product_Schedule from "./views/Product/Product_Schedule";
import Product_Schedule_Create from "./views/Product/Product_Schedule_Create";
import Product_Schedule_View from "./views/Product/Product_Schedule_View";
import Product_Customizer from "./views/Product/Product_Customizer";
import Product_Customizer_Form from "./views/Product/Product_Customizer_Form";
import Product_Customizer_View from "./views/Product/Product_Customizer_View";
import Product_Inventory_Create from "./views/Product/Product_Inventory_Create";

// Shipping Views
import Shipping_Home from "./views/Shipping/Shipping_Home";
import Shipping_Services from "./views/Shipping/Shipping_Services";
import Shipping_Rate from "./views/Shipping/Shipping_Rate";

// Asset Views
import Image_Assets_Home from "./views/Image_Assets/Image_Assets_Home";

import Activate from "./views/Activate";

// Components
import Alert from "./components/Alert";
import PageEditor from "./views/PageEditor/PageEditor";
import Pages_Home from "./views/PageEditor/Pages_Home";

function App() {
  return (
    <Router>
      <Alert />
      <Route exact path="/" component={Home} />
      {/* Activate Route */}
      <Route exact path="/Activate" component={Activate} />
      {/* Teacher Routes */}
      <Route exact path="/LoyaltyProgram" component={Teacher_Index} />
      <Route exact path="/Teacher" component={Teacher_Home} />
      <Route exact path="/Teacher/Teachers" component={Teacher_ViewAll} />
      <Route exact path="/Teacher/Teachers/Create" component={Teacher_Create} />
      <Route exact path="/Teacher/Teachers/View/:id" component={Teacher_View} />
      <Route
        exact
        path="/Teacher/Orders/Create/:id"
        component={Teacher_Order_Create}
      />
      <Route
        exact
        path="/Teacher/Orders/View/:id"
        component={Teacher_Order_View}
      />
      <Route exact path="/Teacher/Request/:id" component={Teacher_Request} />
      <Route exact path="/Teacher/Orders" component={Teacher_Order} />
      <Route exact path="/Teacher/Products" component={Teacher_Products} />
      <Route
        exact
        path="/Teacher/Products/Create"
        component={Teacher_Product_Create}
      />
      <Route
        exact
        path="/Teacher/Products/View/:id"
        component={Teacher_Product_Create}
      />

      {/* School Routes */}
      <Route exact path="/Teacher/Schools" component={School_ViewAll} />
      <Route exact path="/Teacher/Schools/Create" component={School_Create} />
      <Route exact path="/Teacher/Schools/View/:id" component={School_View} />

      <Route exact path="/Marketing" component={Marketing_Home} />
      <Route
        exact
        path="/Marketing/Affiliate"
        component={Marketing_Affiliate}
      />
      <Route
        exact
        path="/Marketing/Affiliate/Create"
        component={Marketing_Affiliate_Create}
      />
      {/* <Route
        exact
        path="/Marketing/Affiliate/View/:id"
        component={Marketing_Affiliate_View}
      /> */}
      <Route exact path="/Marketing/Contact" component={Marketing_Contact} />
      <Route
        exact
        path="/Marketing/Contact/Create"
        component={Marketing_Contact_Create}
      />
      <Route
        exact
        path="/Marketing/Contact/View/:id"
        component={Marketing_Contact_View}
      />
      <Route exact path="/Marketing/URL" component={Marketing_URL} />

      {/* Rental Product Routes */}
      <Route exact path="/Rental" component={Rental_Home} />
      <Route exact path="/Rental/Create" component={Rental_Form} />
      <Route exact path="/Rental/View/:id" component={Rental_Form} />

      {/* Store Product Routes */}
      <Route exact path="/Product" component={Product_Home} />

      <Route exact path="/Product/Customizer" component={Product_Customizer} />
      <Route
        exact
        path="/Product/Customizer/Create"
        component={Product_Customizer_Form}
      />
      <Route
        exact
        path="/Product/Customizer/View/:id"
        component={Product_Customizer_View}
      />
      <Route
        exact
        path="/Product/Inventory/Create"
        component={Product_Inventory_Create}
      />
      <Route exact path="/Product/Schedule" component={Product_Schedule} />
      <Route
        exact
        path="/Product/Schedule/Event/:id"
        component={Product_Schedule_View}
      />
      <Route
        exact
        path="/Product/Schedule/View/:id"
        component={Product_Schedule_Create}
      />
      {/* Shipping Routes */}
      <Route exact path="/Shipping" component={Shipping_Home} />
      <Route exact path="/Shipping/Services" component={Shipping_Services} />
      <Route exact path="/Shipping/Rate/:id" component={Shipping_Rate} />

      {/* Asset Routes */}
      <Route exact path="/Asset" component={Image_Assets_Home} />

      <Route exact path="/Page" component={Pages_Home} />
      <Route exact path="/Page/:id" component={PageEditor} />
    </Router>
  );
}

export default App;
