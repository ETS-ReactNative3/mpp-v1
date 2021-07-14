/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { GoogleLogin } from 'react-google-login';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { useAuth } from '../../contexts/authContext';

export function Login(props) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const auth = useAuth();
  if (auth.user) {
    debugger;
    props.history.push('/');
  }
  return (
    <div>
      <GoogleLogin
        clientId="868456048541-hmp98dlujknnl8dsv9667i9vm7lt8h78.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={user => {
          auth.signin(user);
          console.log(props);
        }}
        onFailure={() => {}}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
