/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

<<<<<<< HEAD
import HomePage from 'containers/HomePage/index.js';
=======
import Dashboard from 'containers/Dashboard/Loadable';
>>>>>>> d8576f96369adda8de79190a7ccfd0934fefe89c
import Login from 'containers/Login/Loadable';
import HealthCheck from 'components/HealthCheck';
import PrivateRoute from 'components/PrivateRoute';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { createBrowserHistory } from 'history';
import { ProvideAuth } from '../../contexts/authContext';
import LogLine from '../../containers/Logline';
import GlobalStyle from '../../global-styles';

const history = createBrowserHistory();

export default function App() {
  return (
    <div>
      <ProvideAuth>
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/storyline/new">
                <LogLine />
              </Route>
              <Route exact path="/healthcheck" component={HealthCheck} />

              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </ProvideAuth>
      <GlobalStyle />
    </div>
  );
}
