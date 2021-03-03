import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import PlacesMap from './pages/PlacesMap';
import CreatePlace from './pages/CreatePlace';
import Place from './pages/Place';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={PlacesMap} />

        <Route path="/places/create" component={CreatePlace} />
        <Route path="/places/:id" component={Place} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;