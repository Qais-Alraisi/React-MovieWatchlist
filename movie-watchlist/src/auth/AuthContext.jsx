import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [email, setEmail] = useState(() => localStorage.getItem('email'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      if (email) localStorage.setItem('email', email);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      delete axios.defaults.headers.common.Authorization;
    }
  }, [token, email]);

  function logout() {
    setToken(null);
    setEmail(null);
  }

  const value = { token, setToken, email, setEmail, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
