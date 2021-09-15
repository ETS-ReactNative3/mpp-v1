import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the login state domain
 */

const selectLoginDomain = state => initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeSelectLogin = () =>
  createSelector(
    selectLoginDomain,
    substate => substate.toJS(),
  );
const makeSelectEmail = createSelector(
  selectLoginDomain,
  substate => substate.email,
);
const makeSelectPassword = createSelector(
  selectLoginDomain,
  substate => substate.password,
);

export default makeSelectLogin;
export { selectLoginDomain, makeSelectEmail, makeSelectPassword };
