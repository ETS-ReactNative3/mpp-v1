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

import Dashboard from 'containers/Dashboard/Loadable';
import Login from 'containers/Login/Loadable';
import HealthCheck from 'components/HealthCheck';
import PrivateRoute from 'components/PrivateRoute';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { createBrowserHistory } from 'history';
import { ProvideAuth } from '../../contexts/authContext';
import LogLine from '../Logline';
import GlobalStyle from '../../global-styles';
import Logline from '../Logline';

const history = createBrowserHistory();

export default function App() {
  return (
    <div>
      <ProvideAuth>
        <Router history={history}>
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="/storyline/:id">
                <Logline />
              </Route>
              <Route exact path="/healthcheck" component={HealthCheck} />

              <Route component={NotFoundPage} />
            </Switch>
        </Router>
      </ProvideAuth>
      <GlobalStyle />
    </div>
  );
}
