import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import PlacesMap from './pages/PlacesMap';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={PlacesMap} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;