// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import type { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (accounts.length > 0) {
          const activeAccount = accounts[0];
          setUser({
            id: activeAccount.localAccountId,
            email: activeAccount.username,
            name: activeAccount.name || activeAccount.username,
            role: 'parent'
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [accounts]);

  const login = async () => {
    try {
      const result = await instance.loginPopup({
        scopes: ["openid", "profile", "email"]
      });
      
      if (result.account) {
        setUser({
          id: result.account.localAccountId,
          email: result.account.username,
          name: result.account.name || result.account.username,
          role: 'parent'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await instance.logoutPopup({
        postLogoutRedirectUri: window.location.origin,
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout
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