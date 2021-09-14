// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
export function* login() {
  yield put(loginSuccess({ email: '', password: '' }));
}
export default function* loginSaga() {
  // See example in containers/HomePage/saga.js
}
