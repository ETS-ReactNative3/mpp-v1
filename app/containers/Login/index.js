/**
 *
 * Login
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose } from 'redux';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
// Messages
import { FormattedMessage } from 'react-intl';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { useAuth } from '../../contexts/authContext';
import { makeSelectEmail, makeSelectPassword } from './selectors';
import history from '../../utils/history';

// Ant Designs
import Row from '../../mppComponents/MppRow/index.js';
import Col from '../../mppComponents/MppCol/index.js';

// css
import './style.scss';

import { UserLogin } from '../../utils/APIcalls/user';
export function Login(props) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const auth = useAuth();
  const [redirectTo, setRedirectTo] = useState(false);
  function performRedirect() {
    if (redirectTo) {
      return <Redirect to="/" />;
    }
    return null;
  }
  return (
    <div>
      <Row type="flex" className="login-container">
        <Col span={12} className="login-bg" />
        <Col span={12} className="login-form">
          <center>
            <div className="login-google">
              <GoogleLogin
                clientId="748260318242-5jro895je7hpt6ltocn1jl3r8160kdae.apps.googleusercontent.com"
                buttonText={<FormattedMessage {...messages.logingoogle} />}
                onSuccess={user => {
                  auth.signin(user);
                  console.log(user);
                  UserLogin(user);
                  history.push('/');
                  setRedirectTo(true);
                }}
                onFailure={() => {}}
                cookiePolicy="single_host_origin"
              />
            </div>
          </center>
          {performRedirect()}
        </Col>
      </Row>
    </div>
  );
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  login: PropTypes.func,
};

const mapStateToProps = createSelector(
  email => makeSelectEmail(),
  password => makeSelectPassword(),
);

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(login(email, password)),
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
