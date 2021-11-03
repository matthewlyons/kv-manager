import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// 404 Route
import No_Match_Found from './views/No_Match_Found/No_Match_Found';

// Teacher Routes
// Teacher Dashboard
import Teacher_Dashboard from './views/Teacher_Dashboard/Teacher_Dashboard';
import Teacher_Signup from './views/Teacher_Signup/Teacher_Signup';
// School Page
// Teacher Store
// Product Page
// Cart Page
// Checkout Page
import Teacher_Store from './views/Teacher_Store/Teacher_Store';

// Rental Routes
// Find Your School
import Find_Your_School from './views/Find_Your_School/Find_Your_School';
// Local and National Rental Products
import Inst_Rental from './views/Inst_Rental/Inst_Rental';
// Customizer
import Customizer from './views/Customizer/Customizer';

// Customizer Routes
// Live Cart
import Cart from './views/Cart/Cart';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/community/application/find-your-school"
          component={Find_Your_School}
        />
        <Route
          exact
          path="/community/application/Rent/:Type(National|Local)/:Inst(Violin|Viola|Cello|Bass)"
          component={Inst_Rental}
        />
        <Route
          exact
          path="/community/application/Teacher/Signup"
          component={Teacher_Signup}
        />
        <Route
          exact
          path="/community/application/Teacher/Store/"
          component={Teacher_Store}
        />
        <Route
          exact
          path="/community/application/Teacher/:id"
          component={Teacher_Dashboard}
        />
        <Route
          exact
          path="/community/application/Customizer/:id"
          component={Customizer}
        />
        <Route exact path="/community/application/Cart" component={Cart} />
        <Route component={No_Match_Found} />
      </Switch>
    </Router>
  );
}

export default App;
