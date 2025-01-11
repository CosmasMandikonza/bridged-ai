// src/hooks/useAuthStatus.ts
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { msalService } from '../services/auth/msalService';

export const useAuthStatus = () => {
  const { isAuthenticated, login } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const account = msalService.getActiveAccount();
        if (account && !isAuthenticated) {
          await login();
        }
      } catch (error) {
        console.error('Auth status check failed:', error);
      } finally {
        setChecking(false);
      }
    };

    checkStatus();
  }, [isAuthenticated, login]);

  return { checking, isAuthenticated };
};