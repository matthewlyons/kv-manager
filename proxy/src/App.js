import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './views/Home';
import Something from './views/Something';

// Rental Routes
// Find Your School
import Find_Your_School from './views/Find_Your_School/Find_Your_School';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/community/tools/something" component={Something} />
      <Route
        exact
        path="/community/tools/find-your-school"
        component={Find_Your_School}
      />
    </Router>
  );
}

export default App;
