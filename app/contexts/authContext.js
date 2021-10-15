import React, { useContext, createContext, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import {SetLocalStorage,GetLocalStorage,RemoveLocalStorage} from '../utils/localStorage/storage';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const user = GetLocalStorage('user');
  const setUser = u => {
    SetLocalStorage('user', JSON.stringify(u));
  };

  const signin = ud => setUser(ud);

  const signout = () => RemoveLocalStorage('user');

  return {
    user,
    signin,
    signout,
  };
}
