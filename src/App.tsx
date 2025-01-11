import { useEffect } from 'react';
import { PublicClientApplication, LogLevel, Configuration } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from '@/components/layout/AppLayout';
import { LoginForm } from '@/features/auth/LoginForm';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { Landing } from "./features/landing/Landing";
import { SignupForm } from '@/features/auth/SignupForm';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';
import { AIChat } from '@/components/ai/AIChat';

const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_B2C_CLIENT_ID,
    authority: `https://${import.meta.env.VITE_AZURE_B2C_TENANT_NAME}.b2clogin.com/${import.meta.env.VITE_AZURE_B2C_DOMAIN}/B2C_1_signupsignin`,
    knownAuthorities: [`${import.meta.env.VITE_AZURE_B2C_TENANT_NAME}.b2clogin.com`],
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string): void => {
        console.log(message);
      },
      logLevel: LogLevel.Info
    }
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

const App = () => {
  useEffect(() => {
    msalInstance.handleRedirectPromise().catch((error: Error) => {
      console.error(error);
    });
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <AIChat />
          </AppLayout>
        </BrowserRouter>
      </AuthProvider>
    </MsalProvider>
  );
};

export default App;