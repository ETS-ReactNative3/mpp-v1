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
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login(props) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const auth = useAuth();
  const minHeight = {
    minHeight: '100vh',
  };
  const bgImage = {
    backgroundImage: `url('https://therichpost.com/wp-content/uploads/2021/02/login-split.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };
  return (
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image" style={bgImage} />
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5" style={minHeight}>

              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-4">Movie Pre Production</h3>
                    <p className="text-muted mb-4">Login to the World of Movies</p>
                    <form>
                      <div className="form-group mb-3">
                        <input id="inputEmail" type="email" name="email" placeholder="Email address" required autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" />
                      </div>
                      <div className="form-group mb-3">
                        <input id="inputPassword" type="password" name="password" placeholder="Password" autoComplete="on" required className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input id="customCheck1" type="checkbox" className="custom-control-input" />
                        <label htmlFor="customCheck1" className="custom-control-label">Remember password</label>
                      </div>
                      <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                    
                      <div className="text-center justify-content-center"><p>( or )</p></div>
                     
                      <div className="text-center d-flex justify-content-center mt-4">
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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
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
