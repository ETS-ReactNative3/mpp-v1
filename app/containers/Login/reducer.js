/*
 *
 * Login reducer
 *
 */
import { fromJS } from 'immutable';
import { UPDATE_INPUT, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export const initialState = fromJS({
  email: '',
  password: '',
  error: true,
  loading: false,
});

/* eslint-disable default-case, no-param-reassign */
function loginReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INPUT:
      return state.set('email', action.email).set('password', action.password);
    case LOGIN_SUCCESS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('email', action.email)
        .set('password', action.password);

    case LOGIN_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default loginReducer;
