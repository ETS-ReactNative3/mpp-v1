/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  console.log(auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {};

export default PrivateRoute;
