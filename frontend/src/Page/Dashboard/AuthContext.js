import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage for token and set user if it exists
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });

  const signup = async (userData) => {
    await axios.post('http://localhost:5000/signup', userData);
  };

  const login = async (userData) => {
    const response = await axios.post('http://localhost:5000/login', userData);
    setUser(response.data);
    localStorage.setItem('token', response.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
