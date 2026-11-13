import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Purge any legacy demo tokens from previous builds
  try {
    localStorage.removeItem('scam_shield_token');
    localStorage.removeItem('scam_shield_user');
    localStorage.removeItem('demo_active_token');
  } catch {
    // Ignore storage errors
  }

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('redflag_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('redflag_token') || null;
    } catch {
      return null;
    }
  });

  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    try {
      localStorage.setItem('redflag_token', newToken);
      localStorage.setItem('redflag_user', JSON.stringify(newUser));
    } catch (err) {
      console.error('Failed to store auth tokens in localStorage', err);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem('redflag_token');
      localStorage.removeItem('redflag_user');
    } catch (err) {
      console.error('Failed to clear auth tokens', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        lang,
        setLang,
        login,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
