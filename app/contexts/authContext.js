import React, { useContext, createContext, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const user = localStorage.getItem('user');
  const setUser = u => {
    localStorage.setItem('user', JSON.stringify(u));
  };

  const signin = ud => setUser(ud);

  const signout = () => localStorage.removeItem('user');

  return {
    user,
    signin,
    signout,
  };
}
