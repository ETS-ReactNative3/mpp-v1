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

import HomePage from 'containers/HomePage/Loadable';
import Login from 'containers/Login/Loadable';
import HealthCheck from 'components/HealthCheck';
import PrivateRoute from 'components/PrivateRoute';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { createBrowserHistory } from 'history';
import { ProvideAuth } from '../../contexts/authContext';

import GlobalStyle from '../../global-styles';

const history = createBrowserHistory();

export default function App() {
  return (
    <div>
      <ProvideAuth>
        <Router history={history}>
          <div>
            <Switch>
              <PrivateRoute exact path="/">
                <HomePage />
              </PrivateRoute>
              <Route exact path="/login" component={Login} />
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
