import { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, saveAuth, clearAuth } from '../services/auth';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // Perform real API login
    const { user: userData, token } = await loginApi(credentials);
    saveAuth({ user: userData, token });
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
    clearAuth();
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
