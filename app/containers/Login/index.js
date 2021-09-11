/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose } from 'redux';
import { GoogleLogin } from 'react-google-login';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { useAuth } from '../../contexts/authContext';
import { makeSelectEmail, makeSelectPassword } from './selectors';

// Ant Designs
import Row from '../../mppComponents/MppRow/index.js'
import Col from '../../mppComponents/MppCol/index.js'

//css
import "./style.scss"
export function Login(props) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const auth = useAuth();

  return (
    <div>
      <Row type="flex" className="login-container">  
        <Col span={12} className="login-bg"></Col>
        <Col span={12} className="login-form">
          <center>
            <div className="login-google">
            <h4>Movie Pre Production</h4>
            <p className="text-muted mb-4">Login to the World of Movies</p>
              <GoogleLogin
                clientId="868456048541-hmp98dlujknnl8dsv9667i9vm7lt8h78.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={user => {
                  auth.signin(user);
                  console.log(props);
                }}
                onFailure={() => {}}
                cookiePolicy="single_host_origin"
              />
            </div>
          </center>
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
  password => makeSelectPassword()
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
