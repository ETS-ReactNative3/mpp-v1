/*
 *
 * Login actions
 *
 */

import { UPDATE_INPUT, LOGIN_SUCCESS, LOGIN_ERROR } from '/constants';

export function loginSuccess(actions) {
  return {
    type: LOGIN_SUCCESS,
    actions,
  };
}

export function loginError(actions) {
  return {
    type: LOGIN_ERROR,
    actions,
  };
}

export function updateInput(actions) {
  return {
    type: UPDATE_INPUT,
    actions,
  };
}
